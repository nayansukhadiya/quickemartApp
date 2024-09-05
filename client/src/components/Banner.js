import React from 'react';
import { NavLink } from 'react-router-dom';
import '../style/home.css'; 

function Banner() {
  return (
    <div className='banner'>
      {/* <div className='banner-detail'>
        <p id='titleFont'>New Arrived</p>
        <h1>Galaxy S24 Ultra</h1>
        <div>
          <NavLink to='/product' className='more-detailed-product'>Learn more</NavLink>
          <NavLink to='/product?id=mss24u' id='bannerBtn'>Buy now</NavLink>
        </div>
      </div> */}
      <img src='https://www.graceonline.in/uploads/Home-page-banner/2024/06/29/grace-groceries01719642492.webp'/>
    </div>
  );
}

export default Banner;
