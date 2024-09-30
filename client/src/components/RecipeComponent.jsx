import React, { useState } from 'react';
import useGeminiChat from '../hooks/useGeminiChat';

function RecipeComponent() {
  const { sendMessage, isLoading, error, rapidIncrident } = useGeminiChat();
  const [input, setInput] = useState("");

  const handleRequest = async () => {
    await sendMessage(input);
  };

  return (
    <div>
      <textarea 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        placeholder="Enter your request for vegetarian dish"
      />
      <button onClick={handleRequest} disabled={isLoading}>Submit</button>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      
      {rapidIncrident.length > 0 && (
        <div>
          <h3>Generated Recipes:</h3>
          <pre>{JSON.stringify(rapidIncrident, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default RecipeComponent;
