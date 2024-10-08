import { useContext } from "react";
import UserContext from "../context/UserContext";

function useChatProduct() { 
  const { chatArrPro, setChatArrPro } = useContext(UserContext);

  const filterPro = async (arr) => {
    if (!arr || arr.length === 0) return;
  
    const ingredients = arr[0]?.rapidRecipeArr[0]?.recipe?.ingredients;
  
    if (ingredients && ingredients.length > 0) {
      // Create an array of fetch promises
      const fetchPromises = ingredients.map((ingredient) => {
        console.log(ingredient.ingredient_name);
        return fetch(`http://localhost:5000/products/filter?q=${ingredient.ingredient_name}&category=${ingredient.ProCategory}`)
          .then((res) => {
            if (!res.ok) {
              throw new Error("Network response was not ok");
            }
            return res.json();
          });
      });
  
      try {
        // Wait for all fetch promises to resolve
        const results = await Promise.all(fetchPromises);
        console.log("Fetched products:", results);
  
        // Initialize the structured product array
        const arr2 = {
          cart_id: arr[0]?.cart_id, 
          cart_name: arr[0]?.rapidRecipeArr[0]?.recipe?.name,
          author: arr[0]?.author,
          products: {} // Change to an object to hold the product lists
        };
  
        // Correct the iteration to use the current ingredient's data
        results.forEach((productList, index) => {
          const ingredient = ingredients[index];  // Use the current ingredient in the loop
          const ingredientName = ingredient?.ingredient_name;
  
          arr2.products[ingredientName] = productList.map(product => ({
            resBrand: ingredient.brand,  // Use the current ingredient's brand
            resUnit: ingredient.packet_size,  // Use the current ingredient's unit
            resQuantity: ingredient.quantity,  // Use the current ingredient's quantity
            resCategory: ingredient.ProCategory,  // Use the current ingredient's category
            resNumberQuantity: ingredient.NumberQuantity,  // Use the current ingredient's number quantity
            productName: product.name,
            data: {
              summary: arr[0]?.rapidRecipeArr[0]?.summary,  // Keep this if it's the same for all products
              ...product 
            }
          }));
        });
  
        // Update chatArrPro state with the new structured object
        setChatArrPro(prev => [...prev, arr2]); // Append arr2 to the previous state
        console.log("Structured products object:", arr2);
  
        return arr2;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      console.log("No ingredients found.");
    }
    return; 
  };
  

  return { filterPro };
}

export default useChatProduct;
