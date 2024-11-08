import React, { useContext, useRef, useEffect } from "react";
import UserContext from "../../context/UserContext";
import "./ChatHistory.css";
import { Link } from "react-router-dom";

function ChatHistory() {
  const { chatArray, chatLoad } = useContext(UserContext);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom whenever chatArray changes
  useEffect(() => {
    scrollToBottom();
  }, [chatArray]);

  // Render the chat history only if there are messages
  return (
    <>
      {chatArray.length === 0 ? null : (
        <div className="chatHistory">
          {chatArray.map((item) => {
            if (item.author === "user" && item.message) {
              return (
                <div className="userMessage Message shadowMes" key={item.id}>
                  <p className="userMessage">{item.message}</p>
                  <div className="tailMessage leftSide">
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 17 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M11.5 10.5C12.0014 13.5086 14.8333 16.3333 16.5 17C10.1 17 6 14.8333 5 13.5L0 15L0.5 0H11V2V4V4.5C11 5.5 11 7.5 11.5 10.5Z" />
                    </svg>
                  </div>
                </div>
              );
            }

            if (item.author === "admin" && item.rapidRecipeArr?.length > 0) {
              return (
                <div className="adminMessage Message" key={item.id}>
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
              );
            }

            return null; // Return null if the message doesn't match user or admin
          })}
        </div>
      )}

      {chatLoad && (
        <section className="dots-container">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          
        </section>
      )}

      {/* Scroll to end of chat */}
      <div ref={chatEndRef} />
    </>
  );
}

export default ChatHistory;
