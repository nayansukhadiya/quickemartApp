import React, { useState, useContext, useEffect, useMemo } from "react";
import UserContext from "../context/UserContext";

function AddCartBtn({ ProIDSearch, img, price, mrp, name, subTitle, category }) {
  const { cartPro, setCartPro } = useContext(UserContext);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  // Calculate the total amount based on quantity and price
  const proAmount = useMemo(() => quantity * price, [quantity, price]);

  // On component mount, check if the product is already in the cart
  useEffect(() => {
    const existingProduct = cartPro.find(
      (item) => item.ProIDSearch === ProIDSearch && item.category === category
    );

    if (existingProduct) {
      // If found, set quantity and added state
      setQuantity(existingProduct.quantity);
      setAdded(true);
    } else {
      setAdded(false);
    }
  }, [cartPro, ProIDSearch, category]);

  // Increment quantity
  const increment = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  // Decrement quantity or remove item if it reaches 0
  const decrement = () => {
    setQuantity((prevQuantity) => {
      if (prevQuantity > 1) {
        return prevQuantity - 1;
      } else {
        // Remove item if quantity is 0
        deleteItem(ProIDSearch, category);
        return 1;  // Reset quantity to 1 for UI purposes
      }
    });
  };

  // Function to remove an item from the cart
  const deleteItem = (ProIDSearch, category) => {
    const updatedCart = cartPro.filter(
      (item) => !(item.ProIDSearch === ProIDSearch && item.category === category)
    );
    setCartPro(updatedCart);
    setAdded(false);  // Reset 'added' to false when item is removed
  };

  // Function to handle adding the product to the cart
  const handleClick = () => {
    setAdded(true);  // Mark the product as added
    setCartPro((prevCartPro) => [
      ...prevCartPro,
      {
        ProIDSearch,
        quantity: 1,  // Add with an initial quantity of 1
        img,
        price,
        mrp,
        name,
        subTitle,
        category,
        ProTotalAmount: price,  // Initial total amount is price when quantity is 1
      },
    ]);
  };

  // Update the cart whenever quantity changes and product is added
  useEffect(() => {
    if (added) {
      setCartPro((prevCartPro) =>
        prevCartPro.map((item) =>
          item.ProIDSearch === ProIDSearch && item.category === category
            ? { ...item, quantity: quantity, ProTotalAmount: proAmount }
            : item
        )
      );
    }
  }, [quantity, added, ProIDSearch, category, proAmount, setCartPro]);

  return (
    <div className={`addToCart ${added ? "QanActive" : ""}`}>
      {!added ? (
        <button onClick={handleClick} className="addButton">
          Add
        </button>
      ) : (
        <div className="counterBtnGroup">
          <div className="counter">
            <button onClick={decrement} className="decrementBtn">
              −
            </button>
            <span className="quantity">{quantity}</span>
            <button onClick={increment} className="incrementBtn">
              +
            </button>
          </div>
          {quantity > 0 && (
            <button onClick={() => deleteItem(ProIDSearch, category)} className="removeBtn">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <g fill="none">
                  <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                  <path fill="white" d="M20 5a1 1 0 1 1 0 2h-1l-.003.071l-.933 13.071A2 2 0 0 1 16.069 22H7.93a2 2 0 0 1-1.995-1.858l-.933-13.07L5 7H4a1 1 0 0 1 0-2zm-3.003 2H7.003l.928 13h8.138zM14 2a1 1 0 1 1 0 2h-4a1 1 0 0 1 0-2z" />
                </g>
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default AddCartBtn;
