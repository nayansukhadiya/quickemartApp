import React, { useContext, useRef, useEffect } from "react";
import UserContext from "../../context/UserContext";
import "./ChatHistory.css";
import { Link } from "react-router-dom";
import ChatLogo from "../../assets/images/chat.svg";

function ChatHistory() {
  const { chatArray, chatLoad } = useContext(UserContext);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatArray]);

  return (
    <>
      {chatArray.length === 0 ? null : (
        <div className="chatHistory">
          {chatArray.map((item) => {
            if (item.author === "user" && item.message) {
              return (
                <div className="userMessage  shadowMes" key={item.id}>
                  {item.message}
                </div>
              );
            }

            if (item.author === "admin" && item.rapidRecipeArr?.length > 0) {
              return (
                <div className="AdminMessageSec">
                  <img src={ChatLogo} alt="img" />
                  <div className="adminMessage " key={item.id}>
                    <h3 className="cartTitle">
                      {item.rapidRecipeArr[0]?.recipe?.name}
                    </h3>
                    <p className="summary">{item.rapidRecipeArr[0]?.summary}</p>
                    <ul className="ingredientsList">
                      {item.rapidRecipeArr[0]?.recipe?.ingredients?.map(
                        (ingredient, index) => (
                          <li key={index}>{ingredient.ingredient_name}</li>
                        )
                      )}
                    </ul>
                    <div className="linkSec">
                      <Link to={`/CartGeneratorPage?id=${item.cart_id}`}>
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
                          className="lucide lucide-shopping-basket"
                        >
                          <path d="m15 11-1 9" />
                          <path d="m19 11-4-7" />
                          <path d="M2 11h20" />
                          <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4" />
                          <path d="M4.5 15.5h15" />
                          <path d="m5 11 4-7" />
                          <path d="m9 11 1 9" />
                        </svg>{" "}
                        View Your Cart
                      </Link>
                    </div>
                  </div>
                </div>
              );
            }

            return null;
          })}
        </div>
      )}

      {chatLoad && (
        <div className="AdminMessageSec LoaderSec">
          <img src={ChatLogo} alt="logo" />
          <div className="skeletonSec">
            <div className="skeletonHead skeletonItem"></div>
            <div className="skeletonHead2 skeletonItem"></div>
            <div className="skeletonList skeletonItem"></div>
            <div className="skeletonList skeletonItem"></div>
            <div className="skeletonList skeletonItem"></div>
          </div>
        </div>
      )}

      {/* Scroll to end of chat */}
      <div ref={chatEndRef} />
    </>
  );
}

export default ChatHistory;
