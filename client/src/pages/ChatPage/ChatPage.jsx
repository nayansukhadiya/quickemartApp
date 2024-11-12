import React, { useState, useContext, useEffect } from "react";
import ChatBot from "../../pages/ChatPage/ChatBot";
import UserContext from "../../context/UserContext";
import "./ChatPage.css";
import ChatHistory from "./ChatHistory";
import LogoImg from "../../assets/images/quickAi.svg";
const suggestionArr = [
  {
    icon: (
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
        className="lucide lucide-cooking-pot"
      >
        <path d="M2 12h20" />
        <path d="M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8" />
        <path d="m4 8 16-4" />
        <path d="m8.86 6.78-.45-1.81a2 2 0 0 1 1.45-2.43l1.94-.48a2 2 0 0 1 2.43 1.46l.45 1.8" />
      </svg>
    ),
    text: "Make an cart for the pavbhaji and some cold drink for the 5 people",
    title: "Recipe",
  },
  {
    icon: (
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
        className="lucide lucide-salad"
      >
        <path d="M7 21h10" />
        <path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z" />
        <path d="M11.38 12a2.4 2.4 0 0 1-.4-4.77 2.4 2.4 0 0 1 3.2-2.77 2.4 2.4 0 0 1 3.47-.63 2.4 2.4 0 0 1 3.37 3.37 2.4 2.4 0 0 1-1.1 3.7 2.51 2.51 0 0 1 .03 1.1" />
        <path d="m13 12 4-4" />
        <path d="M10.9 7.25A3.99 3.99 0 0 0 4 10c0 .73.2 1.41.54 2" />
      </svg>
    ),
    title: "Healthy Breakfast",
    text: "suggest me a healthy and tasty breakfast for 2 people.",
  },
  {
    icon: (
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
        className="lucide lucide-party-popper"
      >
        <path d="M5.8 11.3 2 22l10.7-3.79" />
        <path d="M4 3h.01" />
        <path d="M22 8h.01" />
        <path d="M15 2h.01" />
        <path d="M22 20h.01" />
        <path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10" />
        <path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.7-.72 1.22-1.43 1.22H17" />
        <path d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7" />
        <path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z" />
      </svg>
    ),
    text: "create an snack and some cold drinks for the celebration and cack",
    title: "Birthday Party",
  },
  {
    icon: (
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
        className="lucide lucide-clapperboard"
      >
        <path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z" />
        <path d="m6.2 5.3 3.1 3.9" />
        <path d="m12.4 3.4 3.1 4" />
        <path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
      </svg>
    ),
    text: "want some snacks for 2 people movie night?",
    title: "Movie Night",
  },
  {
    icon: (
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
        className="lucide lucide-mountain-snow"
      >
        <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
        <path d="M4.14 15.08c2.62-1.57 5.24-1.43 7.86.42 2.74 1.94 5.49 2 8.23.19" />
      </svg>
    ),
    title: "Picnic Snacks",
    text: "I have fruits and crackers. Suggest snacks for a picnic for 6 people.",
  },
];

function ChatPage() {
  const { ansGet } = useContext(UserContext);
  const [promptChat, setPromptChat] = useState(null);
  const [chatLoading, setChatLoading] = useState(true);
  const [greeting, setGreeting] = useState("");

  const handleSuggestionClick = (text) => {
    setPromptChat(text);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setChatLoading(false);
    }, 2500); // Set to false after 3 seconds

    return () => clearTimeout(timer); // Clear timeout if component unmounts
  }, []);
  useEffect(() => {
    const hour = new Date().getHours();

    if (hour < 12) {
      setGreeting("Good Morning ☀️");
  } else if (hour < 18) {
      setGreeting("Good Afternoon 🌞");
  } else {
      setGreeting("Good Evening 🌙");
  }
  
  }, []);
  return (
    <div className="ChatPage">
      <div className="FadeBack topFade"></div>
      {chatLoading && (
        <div className="LoadingPageChat">
          <h1>Welcome to</h1>
           <img src={LogoImg} alt="Logo" />
        <h3>Turning Your Prompts into Perfect Carts!</h3>
        </div>
      )}
      <div className="DemoChatBox"></div>
      <div className="pageRes">
        <div className={`prePageChat ${ansGet === true ? "ChatActive" : ""}`}>
          {/* <TextAnimation /> */}
          <div className="MainMessage">
            <h1>Hello 👋,</h1>
            <h4>
              {greeting} What type of cart would you like me to generate?
            </h4>
          </div>
          <div className="boxImgGemini">
            <div>Your cart has been generated using</div>
            <div>
              our custom-trained{" "}
              <img
                src="https://raw.githubusercontent.com/haruiz/geminiplayground/main/images/logo.png"
                alt="Gemini logo"
              />
              model
            </div>
          </div>
          <div className="ChatSuggestCardSec">
            {suggestionArr.map((item, index) => (
              <div
                className="suggestedCard"
                key={index}
                onClick={() => handleSuggestionClick(item.text)}
              >
                <div className="suggestionIcon">{item.icon}</div>
                <div className="textSuggestion">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <ChatHistory />
      </div>
      <div className="DemoChatBox"></div>
      <div className="BottomSecChat">
        <ChatBot chatPrompt={promptChat} />
      </div>
    </div>
  );
}

export default ChatPage;
