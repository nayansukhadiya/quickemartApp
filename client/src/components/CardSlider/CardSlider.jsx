import React, { useRef, useEffect, useState } from 'react';
import './cardSlider.css';

const CardSlider = ({ children }) => {
  const sliderRef = useRef(null);
  const [cardsToShow, setCardsToShow] = useState(3);
  const [isOverflowing, setIsOverflowing] = useState(false); // Track if the slider overflows

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
      {isOverflowing && (
        <button className='slider-button prev' onClick={() => scroll('prev')}>
          &lt;
        </button>
      )}
      <div className='card-slider' ref={sliderRef}>
        {React.Children.map(children, (child, index) => (
          <div className='card-item' key={index}>
            {child}
          </div>
        ))}
      </div>
      {isOverflowing && (
        <button className='slider-button next' onClick={() => scroll('next')}>
          &gt;
        </button>
      )}
    </div>
  );
};

export default CardSlider;
