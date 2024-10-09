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
  const [relatedProd, setRelatedProd] = useState({});
  const query = new URLSearchParams(location.search).get("id");

  // Scroll to top when the query changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [query]);

  // Find the cart based on the query parameter
  useEffect(() => {
    const cart = chatArrPro.find((item) => item.cart_id === query);
    if (cart) {
      setFindCart(cart);
    } else {
      setFindCart(null); // Cart not found
    }
    console.log("product is the ", cart);
  }, [query, chatArrPro]);

  useEffect(() => {
    if (findCart && findCart.products) {
      const filtered = {};
      const relatedFilter = {};

      Object.keys(findCart.products).forEach((key) => {
        const productArray = findCart.products[key];

        const cleanedKey = key.replace(/-/g, ' ');
        console.log("cleanedKey is the ",cleanedKey.toLowerCase())
        let filteredBySubCategoryAndUnit = productArray.filter((product) => {
          const resUnitAsFloat = Math.floor(parseFloat(product.resUnit));
          return (
            product.data.name.toLowerCase().includes(cleanedKey.toLowerCase()) &&
            product.data.sub_category === product.resCategory &&
            product.data.unit.includes(resUnitAsFloat)&&
            !product.data.unit.includes("combo")
          );
        });

        if (filteredBySubCategoryAndUnit.length === 0) {
          filteredBySubCategoryAndUnit = productArray.filter(
            (product) =>
              product.data.sub_category
                .toLowerCase()
                .includes(product.resCategory) &&
              product.data.name.toLowerCase().includes(cleanedKey.toLowerCase()) &&
              product.data.brand === product.resBrand &&
              !product.data.unit.includes("combo")
          );
        }
        if (filteredBySubCategoryAndUnit.length === 0) {
          filteredBySubCategoryAndUnit = productArray.filter(
            (product) =>
              product.data.name.toLowerCase().includes(cleanedKey.toLowerCase()) &&
            product.data.brand === product.resBrand &&
            !product.data.unit.includes("combo")
            );
        }
        if (filteredBySubCategoryAndUnit.length === 0) {
          filteredBySubCategoryAndUnit = productArray.filter(
            (product) =>
              product.data.name.toLowerCase().includes(cleanedKey.toLowerCase()) &&
            !product.data.unit.includes("combo")
            );
        }

        filtered[key] = filteredBySubCategoryAndUnit;
        let relatedFilterPro = productArray.filter(
          (product) =>
            product.data.name.toLowerCase().includes(cleanedKey.toLowerCase()) &&
            product.data.sub_category === product.resCategory  &&
            !product.data.unit.includes("combo")
        );
        if (relatedFilterPro.length === 0) {
          relatedFilterPro = productArray.filter(
            (product) =>
            product.data.sub_category === product.resCategory
            &&
            product.data.name.toLowerCase().includes(cleanedKey.toLowerCase())
            //  &&
            // product.data.brand === product.resBrand
          );
        } 
        const filteredIds = filteredBySubCategoryAndUnit.map(
          (product) => product.data.p_id
        );
        const uniqueRelatedProducts = relatedFilterPro.filter(
          (product) => !filteredIds.includes(product.data.p_id)
        );

        relatedFilter[key] = uniqueRelatedProducts;
      });

      setFilteredProducts(filtered);
      setRelatedProd(relatedFilter);

      console.log("filter product is the ", filtered);
      console.log("related filter product is the ", relatedFilter);
    }
  }, [findCart]);

  if (!findCart) {
    return <p>Cart not found or loading...</p>;
  }

  // Render product cards
  const renderProducts = (products, type) => {
    return products.length > 0 ? (
      products.map((product) => (
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
      <p>Sorry, no {type} currently available</p>
    );
  };

  return (
    <div className="CartGenPage">
      {filteredProducts ? (
        Object.keys(filteredProducts).map((key) => (
          <div key={key} className="ingredientName">
            <div className="detailIngredient">
              <p>Ingredient: {key}</p>
              <p>Quantity: {findCart.products[key][0].resQuantity || "0"}</p>
              <p>Unit: {findCart.products[key][0].resUnit}</p>
            </div>

            <div className="proSliderSec">
              <h1>Perfect cart</h1>
              <CardSlider>
                {renderProducts(filteredProducts[key], "product")}
              </CardSlider>
            </div>

            <div className="proSliderSec">
              <h1>related product</h1>
              <CardSlider>
                {relatedProd[key] &&
                  renderProducts(relatedProd[key], "related product")}
              </CardSlider>
            </div>
          </div>
        ))
      ) : (
        <p>Loading products...</p>
      )}
    </div>
  );
}

export default CartGen;
