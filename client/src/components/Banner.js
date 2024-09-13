import React from 'react';
import { NavLink } from 'react-router-dom';
import '../style/home.css'; 

function Banner() {
  return (
    <div className='banner'>
      <div className='banner-detail'>
        <h1>One Click, and RapidShop AI Builds Your Perfect Cart</h1>
        <p id='titleFont'>Not sure what you need? Let RapidShop AI create your cart in one click. Say goodbye to endless searching and hello to smart shopping.</p>
        <div>
          <NavLink to='/chat' id='bannerBtn'>Try now  &gt;</NavLink>
        </div>
      </div>
      <img src='https://www.brainio.ai/wp-content/uploads/2023/05/ai-robot.png'/>
    </div>
  );
}

export default Banner;


// Tagline Ideas:
// "No Idea What to Buy? Let RapidShop AI Do the Work!"
// "Try Something New Tonight with RapidShop AI."
// "Stuck on What You Need? RapidShop AI Has You Covered!"
// "One Click, and RapidShop AI Builds Your Perfect Cart."
// Content for Hero Section:
// For users who don’t know what to buy: "Not sure what you need? Let RapidShop AI create your cart in one click. Say goodbye to endless searching and hello to smart shopping."

// For users looking to try something new: "Ready to mix it up? Try something new tonight with RapidShop AI. We’ll handle your shopping list so you can focus on what matters most."