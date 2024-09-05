import React, { useState } from "react";
import UserContext from "./UserContext";

const UserContextProvider = ({ children }) => {
  const [allProductData, setAllProductData] = useState([]);
  const [searchProduct, setSearchProduct] = useState(null);

  return (
    <UserContext.Provider
      value={{
        allProductData,
        setAllProductData,
        searchProduct,
        setSearchProduct,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
