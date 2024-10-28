import React, { useState, useContext, useEffect, useRef, useCallback } from "react";
import UserContext from "../../context/UserContext";
import CartCard from "./CartCard";
import "./cart.css";
import BackBtn from "../../components/BackBtn/BackBtn";
import { Link } from "react-router-dom";
import DeliverBoyImg from "../../assets/images/delivery_boy (2).png";

function Cart() {
  const [proCart, setProCart] = useState([]);
  const [discount, setDiscount] = useState(0);
  const { cartPro } = useContext(UserContext);
  const [couponApplied, setCouponApplied] = useState(false);
  const inputRef = useRef(null);

  const calculateTotalValue = useCallback(() => {
    return proCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [proCart]);

  const ApplyCoupon = useCallback(() => {
    const coupons = [
      { code: "nayan", discount: 10 },
      { code: "SAVE20", discount: 20 },
    ];

    const inputValue = inputRef.current ? inputRef.current.value || 0 : 0;
    const foundCoupon = coupons.find((coupon) => coupon.code === inputValue);

    if (foundCoupon) {
      const discountAmount = (calculateTotalValue() * foundCoupon.discount) / 100;
      setDiscount(discountAmount);
      setCouponApplied(true);
    } else {
      setDiscount(0);
      setCouponApplied(false); // Reset coupon applied status
    }
  }, [calculateTotalValue]);

  const calculateDeliveryFee = useCallback(() => {
    return proCart.length > 0 ? 50 : 0;
  }, [proCart.length]);

  const calculateTotalAmount = useCallback(() => {
    const subtotal = calculateTotalValue();
    return subtotal - discount;
  }, [calculateTotalValue, discount]);

  useEffect(() => {
    setProCart(cartPro);
  }, [cartPro]);

  useEffect(() => {
    ApplyCoupon();
  }, [proCart, discount, couponApplied, ApplyCoupon]);


  return (
    <div className={`cartPage ${proCart.length < 1 ? "emptyCart" : ""}`}>
      {proCart.length < 1 ? (
        <div className="emptyCartMessageSec">
          <div className="iconSecEmpty">
            <svg
              width="302"
              height="228"
              viewBox="0 0 302 228"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M45.5545 47.8147H256.898C266.025 47.8147 273.788 54.471 275.181 63.491L296.957 204.491C298.689 215.701 290.017 225.815 278.674 225.815H150.75H23.3896C12.0267 225.815 3.34945 215.667 5.114 204.442L27.279 63.4418C28.6934 54.4442 36.4464 47.8147 45.5545 47.8147Z"
                stroke="#FF7878"
                stroke-width="3"
              />
              <ellipse cx="105" cy="104" rx="15" ry="25" fill="black" />
              <ellipse cx="105" cy="104.5" rx="14" ry="22.5" fill="white" />
              <ellipse cx="111" cy="104.5" rx="9" ry="15.5" fill="black" />
              <ellipse cx="199" cy="103" rx="15" ry="25" fill="black" />
              <ellipse cx="199" cy="103.5" rx="14" ry="22.5" fill="white" />
              <ellipse cx="193" cy="103.5" rx="9" ry="15.5" fill="black" />
              <path
                d="M108 185.215C143.205 160.427 162.201 160.318 194.6 186.734"
                stroke="#FF7878"
                stroke-width="3"
              />
              <path
                d="M224 47.8145C185.125 -15.8144 108.964 -10.6747 69 47.8145"
                stroke="#FF7878"
                stroke-width="3"
              />
            </svg>
          </div>
          <p className="emptyCartMessage">Your cart is empty</p>
          <Link to="/category" className="startShopBtn shadowDeep">
            Start Shopping{" "}
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
              className="lucide lucide-chevron-right"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Link>
        </div>
      ) : (
        <>
          <BackBtn LinkName={"Cart"} />
          <div className="cartPageIn">
            <div className="cartSec">
              <div className="cartCardSec lightGrayBorder ">
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
                        fillRule="evenodd"
                        d="M9.75 2.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5h-.75v1.532a8.7 8.7 0 0 1 4.884 2.023l.836-.835a.75.75 0 1 1 1.06 1.06l-.835.836a8.75 8.75 0 1 1-7.445-3.084V3.25h-.75a.75.75 0 0 1-.75-.75M12 6.25a7.25 7.25 0 1 0 0 14.5a7.25 7.25 0 0 0 0-14.5"
                        clipRule="evenodd"
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
              <div className="ApplyCoupon lightGrayBorder ">
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
                    </svg>
                    Apply Coupon
                  </div>
                  <input
                    type="text"
                    placeholder="Enter Coupon"
                    className="CouponInput lightGrayBorder "
                    ref={inputRef}
                  />
                  <button onClick={ApplyCoupon}>Apply Coupon</button>
                </div>
                <div className="deliveryBoyTip">
                  <div className="DetailSecDelivery">
                    <h4>Tip for Delivery boy</h4>
                    <p>
                      Your kindness means a lot! 100% of your tip will go
                      directly to your delivery partner.
                    </p>
                  </div>
                  <div className="tipButtonSec">
                    <button>₹20</button>
                    <button>₹30</button>
                    <button>₹50</button>
                  </div>
                  <img src={DeliverBoyImg}  alt="img" />
                </div>
                
                <div className="cartTotal lightGrayBorder ">
                  <h3>Bill Detail</h3>
                  <div className="summarySec">
                    <div className="summaryDiv">
                      <p>Sub Total</p>
                      <p className="summaryValue">
                        ₹{calculateTotalValue().toFixed(2)}
                      </p>
                    </div>
                    <div className="summaryDiv">
                      <p>Discount</p>
                      <p className="summaryValue">-₹{discount.toFixed(2)}</p>
                    </div>
                    <div className="summaryDiv">
                      <p>Delivery Fee</p>
                      <p className="summaryValue">
                        <span className="freeFee">FREE</span>{" "}
                        <span className="cancelFee">
                          ₹{calculateDeliveryFee().toFixed(2)}
                        </span>
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
              <div className="cartClearBtn">
                  <button>Clear Cart</button>
                </div>
              </div>
            </div>

            <div className="checkOutSec lightGrayBorder ">
              <p>₹{calculateTotalAmount().toFixed(2)}</p>
              <button className="checkOutSecBtn">
                Checkout{" "}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-arrow-right"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </>
      )}

      {/* <div className="celebrationDiv"><img src={celebrationGif}/></div> */}
    </div>
  );
}

export default Cart;
