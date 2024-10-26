import React, { useState } from "react";
import UserContext from "./UserContext";

const UserContextProvider = ({ children }) => {
  const [allProductData, setAllProductData] = useState([]);
  const [searchProduct, setSearchProduct] = useState(null);
  const [cartPro, setCartPro] = useState([]);
  const [chatArray, setChatArray] = useState([]);
  const [ansGet, setAnsGet] = useState(false);
  const [chatArrPro, setChatArrPro] = useState([]);
  const [chatLoad, setChatLoad] = useState(false);
  const [navCat] = useState([
    { label: "Chips", linkName: "chips", path: "eat/lng" },
    { label: "Chocolates", linkName: "chocolates", path: "eat/0pt" },
    { label: "Biscuit, Cookie & Rusk", linkName: "biscuit", path: "eat/5am" },
    { label: "Fruit Juice", linkName: "fruitJuice", path: "eat/br4" },
    { label: "Noodle", linkName: "noodle", path: "eat/pqj" },
    { label: "Soft Drink", linkName: "softDrink", path: "eat/iw1" },
    { label: "Fruits", linkName: "fruits", path: "eat/w2q" },
    { label: "Vegetables", linkName: "vegetables", path: "eat/lmt" },
    { label: "Flour", linkName: "flour", path: "eat/e6o" },
    { label: "Milk", linkName: "milk", path: "eat/zn0" },
    { label: "Syrup", linkName: "syrup", path: "eat/vqg" },
    { label: "Tea", linkName: "tea", path: "eat/fpm" },
    { label: "Coffee", linkName: "coffee", path: "eat/dui" },
    { label: "Cheese", linkName: "cheese", path: "eat/uxm" },
    { label: "Paneer", linkName: "paneer" },
    { label: "Dairy Cream", linkName: "dairyCream" },
    { label: "Bread & Bun", linkName: "pavBun" },
    { label: "Spice Powder & Masala", linkName: "masala" },
    { label: "Chutneys", linkName: "chutneys" },
    { label: "Herb & Seasoning", linkName: "herb" },
    { label: "Paste & Puree", linkName: "paste" },
    { label: "Baking Ingredients", linkName: "baking" },
    { label: "Dry Fruit", linkName: "dryFruits" },
  ]);

  return (
    <UserContext.Provider
      value={{
        allProductData,
        setAllProductData,
        searchProduct,
        setSearchProduct,
        navCat,
        cartPro,
        setCartPro,
        chatArray,
        setChatArray,
        ansGet,
        setAnsGet,
        chatArrPro,
        setChatArrPro,
        chatLoad, setChatLoad
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
