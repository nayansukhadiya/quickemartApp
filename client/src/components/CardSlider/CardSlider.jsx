import React, { useRef, useEffect, useState } from 'react';
import './cardSlider.css';

const CardSlider = ({ children }) => {
  const sliderRef = useRef(null);
  const [cardsToShow, setCardsToShow] = useState(3);
  const [isOverflowing, setIsOverflowing] = useState(true); 
  const updateCardsToShow = () => {
    if (sliderRef.current) {
      const cardElements = sliderRef.current.children;
      if (cardElements.length === 0) return; // Ensure there are children elements
      const sliderWidth = sliderRef.current.offsetWidth;
      const cardWidth = cardElements[0]?.offsetWidth || 300;
      const margin = parseFloat(window.getComputedStyle(cardElements[0])?.marginRight || '20px'); // Check for valid margin
      const cardsVisible = Math.floor(sliderWidth / (cardWidth + margin));
      setCardsToShow(cardsVisible > 0 ? cardsVisible : 1);
    }
  };

  const checkOverflow = () => {
    if (sliderRef.current) {
      const isOverflow = sliderRef.current.scrollWidth > sliderRef.current.clientWidth;
      setIsOverflowing(isOverflow); // Update overflow state
    }
  };

  useEffect(() => {
    updateCardsToShow();
    checkOverflow(); // Check for overflow on initial render
    window.addEventListener('resize', () => {
      updateCardsToShow();
      checkOverflow(); // Recheck on resize
    });
    return () => {
      window.removeEventListener('resize', () => {
        updateCardsToShow();
        checkOverflow(); // Cleanup on component unmount
      });
    };
  }, []);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.clientWidth / cardsToShow;
      sliderRef.current.scrollBy({ left: direction === 'next' ? scrollAmount : -scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className='card-slider-container'>
      {/* {isOverflowing && ( */}
        <button className='slider-button prev' onClick={() => scroll('prev')}>
          <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"><path fill="currentColor" d="M14.91 6.71a.996.996 0 0 0-1.41 0L8.91 11.3a.996.996 0 0 0 0 1.41l4.59 4.59a.996.996 0 1 0 1.41-1.41L11.03 12l3.88-3.88c.38-.39.38-1.03 0-1.41"/></svg>
        </button>
      {/* )} */}
      <div className='card-slider' ref={sliderRef}>
        {React.Children.map(children, (child, index) => (
          <div className='card-item' key={index}>
            {child}
          </div>
        ))}
      </div>
      {/* {isOverflowing && ( */}
        <button className='slider-button next' onClick={() => scroll('next')}>
          <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"><path fill="currentColor" d="M9.31 6.71a.996.996 0 0 0 0 1.41L13.19 12l-3.88 3.88a.996.996 0 1 0 1.41 1.41l4.59-4.59a.996.996 0 0 0 0-1.41L10.72 6.7c-.38-.38-1.02-.38-1.41.01"/></svg>
        </button>
      {/* )} */}
    </div>
  );
};

export default CardSlider;
