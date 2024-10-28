import React, { useState, useRef, useEffect, useContext } from "react";
import "./chatBox.css";
import useGeminiChat from "../../hooks/useGeminiChat";
import UserContext from "../../context/UserContext";
import useChatProduct from "../../hooks/useChatProduct";

function ChatBot({ chatPrompt, foodStyleBtn }) {
  const { chatArray, setChatArray } = useContext(UserContext);
  const { setAnsGet, setChatLoad } = useContext(UserContext);
  const [prompt, setPrompt] = useState("");
  const [foodPmt, setFoodPmt] = useState(null);
  const [rapidRecipeArr, setRapidRecipeArr] = useState([]);
  const [userCartMessage, setUserCartMessage] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setFoodPmt(foodStyleBtn);
  }, [foodStyleBtn]);

  const { filterPro } = useChatProduct(chatArray);
  const { sendMessage, isLoading, error, response } = useGeminiChat();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (prompt.trim() === "") return;
    setAnsGet(true);
    setChatLoad(true);
    const promptMessage = `I want you to create a shopping cart based on my request. Here's my dish request to how to cook and give me required every minor single ingredient of every single dish: ${prompt}. And food style is must be ${foodPmt}. Please provide a list of ingredients and quantities in JSON format.`;

    try {
      setChatArray((prev) => [
        ...prev,
        { author: "user", message: prompt },
      ]);
      await sendMessage(promptMessage);
      setChatLoad(false);
      setPrompt("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        return;
      } else {
        e.preventDefault();
        handleSubmit(e);
      }
    }
  };

  useEffect(() => {
    if (response) {
      const newRecipe = {
        recipe: {
          name: response.name,
          ingredients: response.ingredients,
        },
        summary: response.summary,
        userMessageDetail: response.userMessageDetail,
      };

      setRapidRecipeArr([newRecipe]);
      setUserCartMessage(response.userMessageDetail);
    } else {
      setRapidRecipeArr([]);
    }
  }, [response]);

  useEffect(() => {
    if (rapidRecipeArr.length > 0) {
      const newIndex = chatArray.length;
      const newEntry = {
        cart_id: generateUniqueIdWithIndex(newIndex),
        author: "admin",
        useChatProduct: userCartMessage,
        rapidRecipeArr: rapidRecipeArr,
      };

      // Update chat array and filter products
      setChatArray((prev) => {
        const updatedChatArray = [...prev, newEntry];
        filterPro([newEntry]); // Call filterPro with the new entry
        return updatedChatArray; // Return the updated array
      });

      console.log("response is ", rapidRecipeArr);
    }
  }, [rapidRecipeArr]);

  const generateUniqueIdWithIndex = (index) => {
    return `Rapid.nayan.dev-${Date.now()}-${index}`;
  };

  useEffect(() => {
    if (chatPrompt) {
      setPrompt(chatPrompt);
    }
  }, [chatPrompt]);

  useEffect(() => {
    if (inputRef.current) {
      const textarea = inputRef.current;
      document.querySelector(".chatBoxForm").style.borderRadius = "28px";
      textarea.style.height = "40px";
      textarea.style.height = `${textarea.scrollHeight}px`;
      textarea.style.overflow = "auto";
    }
  }, [prompt]);

  return (
    <div className="chatBox">
      <form onSubmit={handleSubmit} className="chatBoxForm">
        <textarea
          className="chatBoxInput"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          disabled={isLoading}
          placeholder="Type Your Prompt..."
        />
        <button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          aria-label="Send Message"
          className={`${isLoading ? 'loadingChatBtn' : ''}`}
        >
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
        </button>
      </form>
      {error && <div className="error">{error}</div>}
    </div>
  );
}

export default ChatBot;
