import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import { useLocation } from "react-router-dom";
import CardSlider from "../components/CardSlider";
import "../style/chatGen.css";
import CartGenCard from "../components/CartGenCard";
import BackToShop from "../components/BackToShop";

function CartGen() {
  const { chatArrPro } = useContext(UserContext);
  const location = useLocation();
  const [findCart, setFindCart] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(null);
  const [relatedProd, setRelatedProd] = useState({});
  const [titleAndMessage, setTitleAndMessage] = useState({
    title: '',
    message: ''
  });
  const query = new URLSearchParams(location.search).get("id");
  console.log("cart generation is the", chatArrPro);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [query]);
  console.log("cart id is the from query", query);
  // Find the cart based on the query parameter
  useEffect(() => {
    const cart = chatArrPro.find((item) => item.cart_id === query);
    if (cart) {
      setFindCart(cart);
      setTitleAndMessage({
        title: cart.cart_name,
        message: cart.userMessageDetail,
      })
      console.log("Find cart generation is the", cart);
    } else {
      setFindCart(null);
    }
  }, [query, chatArrPro]);

  useEffect(() => {
    if (findCart && findCart.products) {
      const filtered = {};
      const relatedFilter = {};

      Object.keys(findCart.products).forEach((key) => {
        const productArray = findCart.products[key];
        const cleanedKey = key.replace(/-/g, " ");

        // Function to apply filters with priority
        function applyFilters(
          productArray,
          cleanedKey,
          resCategory,
          resBrand,
          resUnit
        ) {
          const searchKey = cleanedKey.toLowerCase();
          const resUnitAsFloat = Math.floor(parseFloat(resUnit));
          let filterApplied = false;
          let filtered = [];

          // Priority 1: Exact match on name, sub_category, unit (excluding "combo")
          filtered = productArray.filter(
            (product) =>
              product.data?.name?.toLowerCase().includes(searchKey) &&
              product.data?.sub_category === resCategory &&
              product.data?.unit?.includes(resUnitAsFloat) &&
              !product.data?.unit?.includes("combo")
          );

          if (filtered.length > 0) {
            filterApplied = true;
          }

          // Priority 2: Match name, sub_category, and brand (excluding "combo")
          if (filtered.length === 0) {
            filtered = productArray.filter(
              (product) =>
                product.data?.sub_category
                  ?.toLowerCase()
                  .includes(resCategory.toLowerCase()) &&
                product.data?.name?.toLowerCase().includes(searchKey) &&
                product.data?.brand === resBrand &&
                !product.data?.unit?.includes("combo")
            );

            if (filtered.length > 0) {
              filterApplied = true;
            }
          }

          // Priority 3: Match name and brand only (excluding "combo")
          if (filtered.length === 0) {
            filtered = productArray.filter(
              (product) =>
                product.data?.name?.toLowerCase().includes(searchKey) &&
                product.data?.brand === resBrand &&
                !product.data?.unit?.includes("combo")
            );

            if (filtered.length > 0) {
              filterApplied = true;
            }
          }

          // Priority 4: Match name and sub_category (excluding "combo")
          if (filtered.length === 0) {
            filtered = productArray.filter(
              (product) =>
                product.data?.sub_category === resCategory &&
                product.data?.name?.toLowerCase().includes(searchKey) &&
                !product.data?.unit?.includes("combo")
            );

            if (filtered.length > 0) {
              filterApplied = true;
            }
          }

          // Priority 5: Match sub_category and brand (excluding "combo")
          if (filtered.length === 0) {
            filtered = productArray.filter(
              (product) =>
                product.data?.sub_category === resCategory &&
                product.data?.brand === resBrand &&
                !product.data?.unit?.includes("combo") &&
                !product.data?.unit?.toLowerCase().includes("local vendor")
            );

            if (filtered.length > 0) {
              filterApplied = true;
            }
          }

          // Priority 6: Match name only (excluding "combo")
          if (filtered.length === 0) {
            filtered = productArray.filter(
              (product) =>
                product.data?.name?.toLowerCase().includes(searchKey) &&
                !product.data?.unit?.includes("combo")
            );

            if (filtered.length > 0) {
              filterApplied = true;
            }
          }

          return filtered;
        }

        filtered[key] = applyFilters(
          productArray,
          cleanedKey,
          productArray[0]?.resCategory,
          productArray[0]?.resBrand,
          productArray[0]?.resUnit
        );

        // Related Products Filtering
        let relatedFilterPro = productArray.filter(
          (product) =>
            product.data?.name
              ?.toLowerCase()
              .includes(cleanedKey.toLowerCase()) &&
            product.data?.sub_category === productArray[0]?.resCategory &&
            product.data?.brand === productArray[0]?.resBrand &&
            !product.data?.unit?.includes("combo") &&
            product.data?.price <= productArray[0]?.price + 20 &&
            product.data?.price >= productArray[0]?.price - 20
        );

        // Fallback filter
        if (relatedFilterPro.length === 0) {
          relatedFilterPro = productArray.filter(
            (product) =>
              product.data?.sub_category === productArray[0]?.resCategory &&
              !product.data?.unit?.includes("combo")
          );
        }

        const filteredIds = filtered[key].map((product) => product.data.p_id);
        const uniqueRelatedProducts = relatedFilterPro.filter(
          (product) => !filteredIds.includes(product.data.p_id)
        );

        relatedFilter[key] = uniqueRelatedProducts;
      });

      setFilteredProducts(filtered);
      setRelatedProd(relatedFilter);
    }
  }, [findCart]);

  // Function to format quantity and unit
  function formatCartQuantityAndUnit(name, quantity) {
    if (name) {
      let nameArr = name.split(" ");
      let number = parseFloat(nameArr[0]);
      let unitTxt = nameArr.slice(1).join(" ");
      let sum = number * quantity;

      if (isNaN(sum)) {
        return quantity;
      } else {
        return `${sum} ${unitTxt}`;
      }
    } else {
      return "😢 We’re really sorry";
    }
  }

  // Render product cards
  const renderProducts = (products, type) => {
    return products.length > 0 ? (
      products.map((product) => (
        <CartGenCard
          key={product.data.p_id}
          ProIDSearch={product.data.p_id}
          img={product.data.img}
          name={product.data.name}
          price={product.data.price}
          mrp={product.data.mrp}
          unit={product.data.unit}
          category={product.data.category}
          discount={product.data.discount}
          brand={product.data.brand}
        />
      ))
    ) : (
      <p>Sorry, no {type} currently available</p>
    );
  };

  if (!findCart) {
    return <>
    <BackToShop LinkName={"Generative Cart"} />
    <p>Cart not found or loading...</p>;
     </> 
  }
console.log(titleAndMessage)
  return (
    <div className="CartGenPage">
      <BackToShop LinkName={"Generative Cart"}/>
      <h1 className="CartGenTitle">{titleAndMessage.title}</h1>
      <p className="CartUserMessage">{titleAndMessage.message}</p>
      {filteredProducts ? (
        Object.keys(filteredProducts).map((key) => (
          <div className="ingredientSec">
            <div key={key} className="ingredientPart">
              <div className="DetailSec cartInCard">
                <div className="mainTitle">
                  <h3>{key.replace(/\b\w/g, (char) => char.toUpperCase())}</h3>
                </div>
                <div className="requiredDetailsSec">
                <div>
                  <p>Available packet size</p>
                  <h3>
                    {findCart &&
                    findCart.products &&
                    findCart.products[key]?.length > 0
                      ? findCart.products[key][0]?.resUnit === "null"
                        ? null
                        : findCart.products[key][0]?.resUnit
                      : "😢 We're really sorry"}
                  </h3>
                </div>
                <div>
                  <p>Total Required</p>
                  <h3>
                    {formatCartQuantityAndUnit(
                      findCart.products[key][0]?.resUnit,
                      findCart.products[key][0]?.resQuantity
                    )}
                  </h3>
                </div></div>
                <div className="prdDetail">
                  <p>Do you Know</p>
                  <h3>
  {findCart.products[key][0]?.ingredientsDetail || "😢 We're really sorry"}
</h3>

                </div>
              </div>
              <div className="sliderSecIn">
                {filteredProducts[key]?.length > 0 ? (
                  <div className="proSliderSec perfectPro">
                    <h1 className="cardSecTitle cardSecTitle1">
                      Perfect Product for you
                    </h1>
                    <CardSlider>
                      {renderProducts(filteredProducts[key], "product")}
                    </CardSlider>
                  </div>
                ) : (
                  <div>😢 We’re really sorry, but no products were found.</div>
                )}

                {relatedProd[key]?.length > 0 && (
                  <div className="proSliderSec relatedPro1">
                    <h1 className="cardSecTitle cardSecTitle2">
                      You Might Prefer That
                    </h1>
                    <CardSlider>
                      {renderProducts(relatedProd[key], "related product")}
                    </CardSlider>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Loading Products...</p>
      )}
    </div>
  );
}

export default CartGen;
