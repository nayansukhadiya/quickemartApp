import React from 'react';
import { NavLink } from 'react-router-dom';
import '../style/BackToShop.css';

function BackToShop({ LinkName }) { // Destructure props to get LinkName
  return (
    <NavLink to='/' className="HomeBtn">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      >
        <path d="m15 18-6-6 6-6"/>
      </svg> 
      {LinkName}
    </NavLink>
  );
}

export default BackToShop;
