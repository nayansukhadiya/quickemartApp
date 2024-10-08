import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import { useLocation } from "react-router-dom";
import HomeCard from "../components/HomeCard";
import CardSlider from "../components/CardSlider";
import "../style/chatGen.css";

function CartGen() {
  const { chatArrPro } = useContext(UserContext);
  const location = useLocation();
  const [findCart, setFindCart] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(null);
  const query = new URLSearchParams(location.search).get("id");

  // Scroll to top when the query changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [query]);

  // Find the cart based on the query parameter
  useEffect(() => {
    const findCart = chatArrPro.find((item) => item.cart_id === query);
    setFindCart(findCart);
    console.log("find cart is the ", findCart);
  }, [query, chatArrPro]);

  useEffect(() => {
    if (findCart && findCart.products) {
      let filtered = {};
      const subCategoryToMatch = "i_c_tub";
  
      for (let key of Object.keys(findCart.products)) {
        const productArray = findCart.products[key];
        let filteredProductsBySubCategory = productArray.filter(
          (product) =>
            product.data.sub_category === product.resCategory &&
            product.data.name.toLowerCase().includes(key.toLowerCase())
        );
  
        // If no products match the initial filter, fallback to filtering by brand
        if (filteredProductsBySubCategory.length === 0) {
          filteredProductsBySubCategory = productArray.filter(
            (product) =>
              product.data.brand.toLowerCase().includes(key.toLowerCase())
          );
        }
  
        filtered[key] = filteredProductsBySubCategory;
      }
  
      setFilteredProducts(filtered);
      console.log("filteredProducts is the ",filteredProducts);
    }
  }, [findCart]);
  

  return (
    <div className="CartGenPage">
      {filteredProducts ? (
        Object.keys(filteredProducts).map((key) => (
          <div key={key} className="ingredientName">
            <div className="detailIngredient">
              <p>Ingredient: {key}</p>
              <p>Quantity: {findCart.products[key][0].resQuantity}</p>
              <p>Unit: {findCart.products[key][0].resUnit}</p>
            </div>
            
            <CardSlider>
              {filteredProducts[key].length > 0 ? (
                filteredProducts[key].map((product) => (
                  <HomeCard
                    key={product.data.p_id}
                    ProIDSearch={product.data.p_id}
                    img={product.data.img}
                    name={product.data.name}
                    price={product.data.price}
                    mrp={product.data.mrp}
                    unit={product.data.unit}
                    category={product.data.category}
                    discount={product.data.discount}
                  />
                ))
              ) : (
                <p>Sorry No product Currently Available</p>
              )}
            </CardSlider>
          </div>
        ))
      ) : (
        <p>Loading or cart not found.</p>
      )}
    </div>
  );
}

export default CartGen;
