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
        setAdded(false);
        return 1;
      }
    });
  };

  // Function to remove an item from the cart
  const deleteItem = (ProIDSearch, category) => {
    const updatedCart = cartPro.filter(
      (item) => !(item.ProIDSearch === ProIDSearch && item.category === category)
    );
    setCartPro(updatedCart);
  };

  // Function to remove item from the cart regardless of quantity
  const handleRemove = () => {
    deleteItem(ProIDSearch, category);
    setAdded(false);
  };

  // Handle adding the product
  const handleClick = () => {
    setAdded(true);
    setQuantity(1);
    setCartPro((prevCartPro) => [
      ...prevCartPro,
      {
        ProIDSearch,
        quantity: 1,
        img,
        price,
        mrp,
        name,
        subTitle,
        category,
        ProTotalAmount: price, // Initial total amount is price when quantity is 1
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
            <button onClick={handleRemove} className="removeBtn">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2zM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1"/></svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default AddCartBtn;
