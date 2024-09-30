import React, { useState, useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import AddCartBtn from "../components/AddCartBtn";
import '../style/cart.css'

function Cart() {
  const [proCart, setProCart] = useState([]);
  const { cartPro } = useContext(UserContext);

  useEffect(() => {
    setProCart(cartPro);
  }, [cartPro]); 

  return (
    <div>
      <div className="cartSec">
        {proCart && proCart.length > 0 ? (
          proCart.map((item) => (
            <div key={item.ProIDSearch} className="CartCard">
              <div className="part-1">
              <div className="imgCartSec">
                <img src={item.img} alt={item.name} />
              </div>
              <div className="cartProDetail">
                <div className="cartProName">{item.name}</div>
                <div className="cartProSubTitle">{item.subTitle}</div>
              </div></div>
              <div className="AmountDetail">
                <AddCartBtn
                  ProIDSearch={item.ProIDSearch}
                  img={item.img}
                  name={item.name}
                  price={item.price}
                  mrp={item.mrp}
                  subTitle={item.subTitle}
                  category={item.category}
                />
                <p className="cartProTotalAmount">&#8377; {item.ProTotalAmount}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="emptyMessage">Your cart is empty</div>
        )}
      </div>
    </div>
  );
}

export default Cart;
