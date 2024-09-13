// components/CardSlider.js

import React, { useRef, useEffect, useState } from 'react';
import '../style/cardSlider.css'; 

const CardSlider = ({ children }) => {
  const sliderRef = useRef(null);
  const [cardsToShow, setCardsToShow] = useState(3); 

  const updateCardsToShow = () => {
    if (sliderRef.current) {
      const sliderWidth = sliderRef.current.offsetWidth;
      const cardElements = sliderRef.current.children;
      const cardWidth = cardElements[0]?.offsetWidth || 300; 
      const margin = parseFloat(window.getComputedStyle(cardElements[0]).marginRight) || 20; 
      const cardsVisible = Math.floor(sliderWidth / (cardWidth + margin));
      setCardsToShow(cardsVisible > 0 ? cardsVisible : 1);
    }
  };

  useEffect(() => {
    updateCardsToShow();
    window.addEventListener('resize', updateCardsToShow);
    return () => {
      window.removeEventListener('resize', updateCardsToShow);
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
      <button className='slider-button prev' onClick={() => scroll('prev')}>&lt;</button>
      <div className='card-slider' ref={sliderRef}>
        {React.Children.map(children, (child, index) => (
          <div className='card-item' key={index}>
            {child}
          </div>
        ))}
      </div>
      <button className='slider-button next' onClick={() => scroll('next')}>&gt;</button>
    </div>
  );
};

export default CardSlider;
