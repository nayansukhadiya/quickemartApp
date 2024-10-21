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
    return calculateTotalValue() - calculateTotalSavings();
  };

  return (
    <div className="cartPage">
      <BackToShop LinkName={"Cart"} />
      <div className="cartPageIn">
        {/* <h1>My Cart</h1> */}
        <div className="cartSec">
          <div className="cartCardSec">
            <div className="cartCardSecTitle">
              <div className="iconSec">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                >
                <path
                  fill="black"
                  fill-rule="evenodd"
                  d="M9.75 2.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5h-.75v1.532a8.7 8.7 0 0 1 4.884 2.023l.836-.835a.75.75 0 1 1 1.06 1.06l-.835.836a8.75 8.75 0 1 1-7.445-3.084V3.25h-.75a.75.75 0 0 1-.75-.75M12 6.25a7.25 7.25 0 1 0 0 14.5a7.25 7.25 0 0 0 0-14.5"
                  clip-rule="evenodd"
                  />
                <path
                className="innerFill"
                fill="black"
                d="M12 7.75a5.75 5.75 0 1 0 4.98 8.625L12 13.5z"
                opacity="0.5"
                />
              </svg>
                </div>
              
              <div>
              <p className="bigFont">Deliver in 8 min</p>
              <p className="smallFont">Shipped {proCart.length} items</p>
              </div>
            </div>
            {proCart.map((item) => (
              <CartCard key={item.ProIDSearch} item={item} />
            ))}
          </div>
          <div className="offerBenefitsSec">
            {/* <h2>Offer and Benefits</h2> */}
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
              <h3>Bill Detail</h3>
              <div className="summarySec">
                <div className="summaryDiv">
                  <p>Item Total</p>
                  <p className="summaryValue">
                    ₹{calculateTotalValue().toFixed(2)}
                  </p>
                </div>
                <div className="summaryDiv">
                  <p>Total Savings</p>
                  <p className="summaryValue">
                    ₹{calculateTotalSavings().toFixed(2)}
                  </p>
                </div>
                <div className="summaryDiv">
                  <p>Delivery Fee</p>
                  <p className="summaryValue">
                  <span className="freeFee">FREE</span> <span className="cancelFee">₹{calculateDeliveryFee().toFixed(2)}</span>
                  </p>
                </div>

                <div className="summaryDiv totalAmount">
                  <p className="">Total Amount</p>
                  <p className="summaryValue">
                    ₹{calculateTotalAmount().toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="checkOutSec">
          <button className="checkOutSecBtn">select payment option</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
