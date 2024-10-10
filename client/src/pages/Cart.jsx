import React, { useState, useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import AddCartBtn from "../components/AddCartBtn";
import CartCard from "../components/CartCard";  // Import the CartCard component
import '../style/cart.css';

function Cart() {
  const [proCart, setProCart] = useState([]);
  const { cartPro } = useContext(UserContext);

  useEffect(() => {
    setProCart(cartPro);
  }, [cartPro]); 
console.log(cartPro)
  return (
    <div>
      <div className="cartSec">
        {proCart && proCart.length > 0 ? (
          proCart.map((item) => (
            <CartCard key={item.ProIDSearch} item={item} />  
          ))
        ) : (
          <div className="emptyMessage">Your cart is empty</div>
        )}
      </div>
    </div>
  );
}

export default Cart;
