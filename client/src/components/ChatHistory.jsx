// import React, { useContext, useRef, useEffect } from "react";
// import UserContext from "../context/UserContext";
// import "../style/ChatHistory.css";
// import { Link } from "react-router-dom";
// import useGeminiChat from "../hooks/useGeminiChat";

// function ChatHistory() {
//   const { chatArray } = useContext(UserContext);
//   const { sendMessage, isLoading, error, response } = useGeminiChat();
//   const chatEndRef = useRef(null);
//   const scrollToBottom = () => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [chatArray]);

//   return (
//     <div className="chatHistory">
//       {chatArray.length === 0 ? (
//         <p>No chat history available.</p>
//       ) : (
//         chatArray.map((item) => {
//           if (item.author === "user") {
//             return (
//               <div className="userMessage Message shadowMes" key={item.id}>
//                 <h4 className="userTitle">You</h4>
//                 <p className="userMessage">
//                 {item.message}
//                 </p>
//               </div>
//             );
//           } else if (
//             item.author === "admin" &&
//             item.rapidRecipeArr.length > 0
//           ) {
//             return (
//               <div className="adminMessage Message " key={item.id}>
              
//                   <h4 className="AdminTitle">UrbanAi</h4>
//                   <h3 className="cartTitle">
//                     {item.rapidRecipeArr[0]?.recipe?.name}
//                   </h3>
//                   <p className="summary">
//                     {item.rapidRecipeArr[0]?.summary}
//                       </p>
//                     <ul className="ingredientsList">
//                       {item.rapidRecipeArr[0]?.recipe?.ingredients?.map(
//                         (ingredient, index) => (
//                           <li key={index}>
//                             {ingredient.ingredient_name}
//                           </li>
//                         )
//                       )}
//                     </ul>
//                   <div className="linkSec">
//                     <Link to={`/cartgen?id=${item.cart_id}`}>
//                       View Your Cart{" "}
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="24"
//                         height="24"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         stroke-width="2"
//                         stroke-linecap="round"
//                         stroke-linejoin="round"
//                         className="lucide lucide-square-arrow-out-up-right"
//                       >
//                         <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" />
//                         <path d="m21 3-9 9" />
//                         <path d="M15 3h6v6" />
//                       </svg>
//                     </Link>
//                   </div>
//               </div>
//             );
//           }
//           return null;
//         })
//       )}
//       {/* The div that triggers scrolling to the bottom */}
//       <div ref={chatEndRef} />
//     </div>
//   );
// }

// export default ChatHistory;

import React, { useContext, useRef, useEffect } from "react";
import UserContext from "../context/UserContext";
import "../style/ChatHistory.css";
import { Link } from "react-router-dom";

function ChatHistory() {
  const { chatArray ,chatLoad, setChatLoad} = useContext(UserContext);
  const chatEndRef = useRef(null);
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatArray]);

  // Check if there is an admin message
  const hasAdminMessage = chatArray.some(
    (item) => item.author === "admin" && item.rapidRecipeArr?.length > 0
  );

  return (
    <div className="chatHistory">
      {chatArray.length === 0 ? (
        <p>No chat history available.</p>
      ) : (
        chatArray.map((item) => {
          if (item.author === "user" && item.message) {
            return (
              <div className="userMessage Message shadowMes" key={item.id}>
                <h4 className="userTitle">You</h4>
                <p className="userMessage">{item.message}</p>
              </div>
            );
          }
          // Render loading message only if there are no admin messages
          if (item.author === "ChatLoad" && !hasAdminMessage) {
            return (
              <div className="loadingMessage Message" key={item.id}>
                <div className="loader">
  <li className="ball"></li>
  <li className="ball"></li>
  <li className="ball"></li>
</div>
              </div>
            );
          }
          // Render admin message if available
          if (item.author === "admin" && item.rapidRecipeArr?.length > 0) {
            return (
              <div className="adminMessage Message" key={item.id}>
                <h4 className="AdminTitle">UrbanAi</h4>
                <h3 className="cartTitle">
                  {item.rapidRecipeArr[0]?.recipe?.name}
                </h3>
                <p className="summary">
                  {item.rapidRecipeArr[0]?.summary}
                </p>
                <ul className="ingredientsList">
                  {item.rapidRecipeArr[0]?.recipe?.ingredients?.map(
                    (ingredient, index) => (
                      <li key={index}>{ingredient.ingredient_name}</li>
                    )
                  )}
                </ul>
                <div className="linkSec">
                  <Link to={`/cartgen?id=${item.cart_id}`}>
                    View Your Cart{" "}
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
                      className="lucide lucide-square-arrow-out-up-right"
                    >
                      <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" />
                      <path d="m21 3-9 9" />
                      <path d="M15 3h6v6" />
                    </svg>
                  </Link>
                </div>
              </div>
            );
          }
          return null;
        })
      )}
      {/* The div that triggers scrolling to the bottom */}
      <div ref={chatEndRef} />
    </div>
  );
}

export default ChatHistory;

