import React, { useState, useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import CartCard from "../components/CartCard"; // Import the CartCard component
import "../style/cart.css";
import BackToShop from "../components/BackToShop";

function Cart() {
  const [proCart, setProCart] = useState([]);
  const { cartPro } = useContext(UserContext);

  useEffect(() => {
    setProCart(cartPro);
  }, [cartPro]);

  // Helper function to calculate the total value of items in the cart
  const calculateTotalValue = () => {
    return proCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  // Helper function to calculate the total savings (assuming a discount field in each item)
  const calculateTotalSavings = () => {
    return proCart.reduce((acc, item) => {
      const saving = item.mrp ? (item.mrp - item.price) * item.quantity : 0;
      return acc + saving;
    }, 0);
  };

  // Helper function to calculate the delivery fee
  const calculateDeliveryFee = () => {
    return proCart.length > 0 ? 50 : 0; // Example: a flat fee of 50
  };

  // Helper function to calculate the total amount including delivery
  const calculateTotalAmount = () => {
    return calculateTotalValue() + calculateDeliveryFee();
  };

  return (
    <div className="cartPage">
      <BackToShop LinkName={"Cart"} />
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
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-circle-percent"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="m15 9-6 6" />
                  <path d="M9 9h.01" />
                  <path d="M15 15h.01" />
                </svg>{" "}
                Apply Coupon
              </div>
              <input
                type="text"
                placeholder="Enter Coupon"
                className="CouponInput"
              />
            </div>
            <div className="cartTotal">
              <h3>Cart Total</h3>
              <div className="summarySec">
                <div className="summaryDiv">
                  <p>Total Value</p>
                  <p className="summaryValue">₹{calculateTotalValue().toFixed(2)}</p>
                </div>
                <div className="summaryDiv">
                  <p>Total Savings</p>
                  <p className="summaryValue">₹{calculateTotalSavings().toFixed(2)}</p>
                </div>
                <div className="summaryDiv">
                  <p>Delivery Fee</p>
                  <p className="summaryValue">₹{calculateDeliveryFee().toFixed(2)}</p>
                </div>
                <div className="summaryDiv">
                  <p>Total Amount</p>
                  <p className="summaryValue">₹{calculateTotalAmount().toFixed(2)}</p>
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
