import React, { useState, useContext, useEffect, useMemo } from "react";
import ChatBot from "../components/ChatBot";
import UserContext from "../context/UserContext";
import "../style/ChatPage.css";
import HomeCard from "../components/HomeCard";
function ChatPage() {
  useEffect(() => {
    fetch("./json/searchProduct.json")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }, []);

  const { chatArray, setChatArray } = useContext(UserContext);
  return (
    <div className="ChatPage">
      <div className="pageRes">
        <div className="textChat"><span>Not sure what you need?</span><br/> Let RapidShop AI create your cart in one click. Say goodbye to endless searching and hello to smart shopping.</div>
        <div className="cartSec">
          <div className="ChatSuggestCard"></div>
        </div>
      </div>
      <ChatBot />
    </div>
  );
}

export default ChatPage;
