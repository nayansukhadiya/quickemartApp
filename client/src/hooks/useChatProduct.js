import { useContext } from "react";
import UserContext from "../context/UserContext";
import config from "../config";

function useChatProduct() { 
  const { chatArrPro, setChatArrPro } = useContext(UserContext);

  const filterPro = async (arr) => {
    if (!arr || arr.length === 0) return;
  
    const ingredients = arr[0]?.rapidRecipeArr[0]?.recipe?.ingredients;
  
    if (ingredients && ingredients.length > 0) {
      const fetchPromises = ingredients.map((ingredient) => {
        console.log(ingredient.ingredient_name);
        return fetch(`${config.apiUrl}/products/filter?q=${ingredient.ingredient_name}&category=${ingredient.ProCategory}`)
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
          products: {} 
        };
  
        results.forEach((productList, index) => {
          const ingredient = ingredients[index];  
          const ingredientName = ingredient?.ingredient_name;
  
          arr2.products[ingredientName] = productList.map(product => ({
            resBrand: ingredient.brand, 
            resUnit: ingredient.packet_size,  
            resQuantity: ingredient.quantity,  
            resCategory: ingredient.ProCategory,  
            resNumberQuantity: ingredient.NumberQuantity, 
            productName: product.name,
            ingredientsDetail: ingredient.ingredientsDetail,
            data: {
              summary: arr[0]?.rapidRecipeArr[0]?.summary,  
              ...product 
            }
          }));
        });
  
        setChatArrPro(prev => [...prev, arr2]); 
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
