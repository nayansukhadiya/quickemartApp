import React from 'react'
import { Link } from "react-router-dom";
import '../style/HomeBanner.css'

function HomeBanner() {
  return (
    <div className='HomeBannerSection'>
        <div className='HomeBannerBox' style={{background: "#bfffbf"}}>
            <div className='detailHomeBanner'>
                <p>Fresh Vegetable & Fruits</p>
                <Link to='/shop?id=vegetable'>order now</Link>
            </div>
            <img src='https://sojmayimpex.com/wp-content/uploads/2021/05/about_veg.png'></img>
        </div>
        <div className='HomeBannerBox' style={{background: "#bfffbf"}}>
            <div className='detailHomeBanner'>
                <p>Fresh Vegetable & Fruits</p>
                <Link to='/shop?id=vegetable'>order now</Link>
            </div>
            <img src='https://rukminim2.flixcart.com/image/1160/1160/xif0q/chocolate/y/a/p/350-desserts-brownie-5-cadbury-dairy-milk-silk-original-imahfjehtcg4q9qa.jpeg?q=90'></img>
        </div>
    </div>
  )
}

export default HomeBanner