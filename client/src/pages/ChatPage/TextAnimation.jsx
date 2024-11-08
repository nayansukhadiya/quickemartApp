import React, { useState, useEffect } from 'react';
import "./ChatPage.css";

const messages = [
  "No Idea What to Buy? Let QuickE AI Do the Work!",
  "Try Something New Tonight with QuickE AI.",
  "Stuck on What You Need? QuickE AI Has You Covered!",
  "One Click, and QuickE AI Builds Your Perfect Cart."
];

const TextAnimation = () => {
  const [index, setIndex] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 3000); // Change text every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="textChat">
      {messages.map((message, i) => (
        <span key={i} className={i === index ? 'active' : ''}>
          {message}
        </span>
      ))}
    </div>
  );
};

export default TextAnimation;
