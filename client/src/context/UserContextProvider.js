import React, { useState, useEffect } from "react";
import UserContext from "./UserContext";

const UserContextProvider = ({ children }) => {
  const [allProductData, setAllProductData] = useState([]);
  const [searchProduct, setSearchProduct] = useState(null);
  const [cartPro, setCartPro] = useState(() => {
    const savedCart = localStorage.getItem("cartPro");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [chatArray, setChatArray] = useState([]);
  const [ansGet, setAnsGet] = useState(false);
  const [chatArrPro, setChatArrPro] = useState([]);
  const [chatLoad, setChatLoad] = useState(false);
  const [locationBox, setLocationBox] = useState(false);
  const [userLocationName, setUserLocationName] = useState("Set Location");
  const [headerCls, setHeaderCls] = useState(false);

  useEffect(() => {
    localStorage.setItem("cartPro", JSON.stringify(cartPro));
  }, [cartPro]);

  return (
    <UserContext.Provider
      value={{
        headerCls,
        setHeaderCls,
        userLocationName,
        setUserLocationName,
        locationBox,
        setLocationBox,
        allProductData,
        setAllProductData,
        searchProduct,
        setSearchProduct,
        cartPro,
        setCartPro,
        chatArray,
        setChatArray,
        ansGet,
        setAnsGet,
        chatArrPro,
        setChatArrPro,
        chatLoad,
        setChatLoad,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;