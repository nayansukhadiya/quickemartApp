import React, { useState, useRef, useEffect, useContext } from "react";
import "../style/chatBox.css";
import useGeminiChat from "../hooks/useGeminiChat"; 
import UserContext from '../context/UserContext';

function ChatBot() {
  const { chatArray, setChatArray} = useContext(UserContext);
  const [prompt, setPrompt] = useState("");
  const [rapidRecipeArr, setRapidRecipeArr] = useState([]); 
  const inputRef = useRef(null);

  const { sendMessage, isLoading, error, response } = useGeminiChat(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (prompt.trim() === "") return;
    const promptMessage = `I want you to create a shopping cart based on my request. Here's my vegetarian dish request: ${prompt}. Please provide a list of ingredients and quantities in JSON format.`;

    try {
      await sendMessage(promptMessage);
      setPrompt(""); 
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  useEffect(() => {
    if (response) {
      setRapidRecipeArr([
        {
          recipe: {
            name: response.name,
            ingredients: response.ingredients,
          },
          summary: response.summary,
        },
      ]);
    } else {
      setRapidRecipeArr([]);
    }
  }, [response]);

  useEffect(() => {
    console.log("RapidRecipeArr:", rapidRecipeArr);
    setChatArray((prev) => [...prev, ...rapidRecipeArr]);
  }, [rapidRecipeArr]);
  
  useEffect(() => {
    if (inputRef.current) {
      const textarea = inputRef.current;
      const ChatBox = document.querySelector(".chatBoxForm").style.borderRadius = "28px";
      textarea.style.height = '40px'; 
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [prompt]); 

  return (
    <div className="chatBox">
      <form onSubmit={handleSubmit} className="chatBoxForm">
        <textarea
          className="chatBoxInput"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          ref={inputRef}
          disabled={isLoading}
          placeholder="Type your message..."
        />
        <button type="submit" disabled={isLoading || !prompt.trim()}>
          {isLoading ? (
          <div className="spinner"></div>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="white"
                fillRule="evenodd"
                d="M3.402 6.673c-.26-2.334 2.143-4.048 4.266-3.042l11.944 5.658c2.288 1.083 2.288 4.339 0 5.422L7.668 20.37c-2.123 1.006-4.525-.708-4.266-3.042L3.882 13H12a1 1 0 1 0 0-2H3.883z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      </form>
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default ChatBot;
