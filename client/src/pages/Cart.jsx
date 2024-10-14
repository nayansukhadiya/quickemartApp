import React, { useState, useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import AddCartBtn from "../components/AddCartBtn";
import CartCard from "../components/CartCard"; // Import the CartCard component
import "../style/cart.css";

function Cart() {
  const [proCart, setProCart] = useState([]);
  const { cartPro } = useContext(UserContext);

  useEffect(() => {
    setProCart(cartPro);
  }, [cartPro]);
  console.log(cartPro);
  return (
    <div className="cartPage">
      <div className="cartPageIn">
        <h1>My Cart</h1>
        <div className="cartSec">
          <div className="cartCardSec">
            {proCart && proCart.length > 0 ? (
              proCart.map((item) => (
                <CartCard key={item.ProIDSearch} item={item} />
              ))
            ) : (
              <div className="emptyMessage">Your cart is empty</div>
            )}
          </div>
          <div className="offerBenefitsSec">
            <h2>Offer and Benefits</h2>
            <div className="ApplyCoupe">
              <div className="titleSec">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-circle-percent"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="m15 9-6 6" />
                  <path d="M9 9h.01"/>
                  <path d="M15 15h.01" />
                </svg>{" "}
                Apply Coupon
              </div>
              <input type="text" placeholder="Enter Coupon" className="CouponInput"/>
            </div>
            <div className="cartTotal">
              <h3>Cart Total</h3>
              <div className="summarySec">
                <div className="summaryDiv">
                  <p>Total items</p>
                  <p className="summaryValue">{proCart.length}</p>
                </div>
                <div className="summaryDiv">
                  <p>Total Value</p>
                  <p className="summaryValue">{proCart.length}</p>
                </div>
                <div className="summaryDiv">
                  <p>Total Saving</p>
                  <p className="summaryValue">{proCart.length}</p>
                </div>
                <div className="summaryDiv">
                  <p>delivery fee</p>
                  <p className="summaryValue">{proCart.length}</p>
                </div>
                <div className="summaryDiv">
                  <p>Total Amount</p>
                  <p className="summaryValue">{proCart.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
