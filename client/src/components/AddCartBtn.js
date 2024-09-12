import React, { useState } from 'react';

function AddCartBtn() {
  const [quantity, setQuantity] = useState(1); // Initialize quantity to 1
  const [added, setAdded] = useState(false); // Tracks whether the item is added to the cart

  // Increment quantity
  const increment = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  // Decrement quantity and remove the counter if quantity goes to 0
  const decrement = () => {
    setQuantity((prevQuantity) => {
      if (prevQuantity > 1) {
        return prevQuantity - 1;
      } else {
        setAdded(false); // Switch back to "Add" button
        return 0;
      }
    });
  };

  // Handle button click to change from "Add" to counter mode
  const handleClick = () => {
    setAdded(true); // Switch to counter mode
    setQuantity(1); // Reset quantity to 1 if "Add" is clicked again
  };

  return (
    <div className={`addToCart ${added ? "QanActive" : ""}`}>
      {!added ? (
        <button onClick={handleClick} className="addButton">
          Add
        </button>
      ) : (
        <div className="counter">
          <button onClick={decrement} className="decrementBtn">−</button>
          <span className="quantity">{quantity}</span>
          <button onClick={increment} className="incrementBtn">+</button>
        </div>
      )}
    </div>
  );
}

export default AddCartBtn;
