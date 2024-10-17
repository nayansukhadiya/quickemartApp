import React from 'react'
import { Link } from "react-router-dom";
import '../style/HomeBanner.css'

function HomeBanner() {
  return (
    <div className='HomeBannerSection'>
        <div className='HomeBannerBox' style={{background: "#bfffbf"}}>
            <div className='detailHomeBanner'>
                <p>Fresh Vegetable & Fruits</p>
                <Link to='/shop?catid=sweets&subid=vegetable'>order now</Link>
            </div>
            <img src='https://sojmayimpex.com/wp-content/uploads/2021/05/about_veg.png'></img>
        </div>
        <div className='HomeBannerBox' style={{background: "#bfffbf"}}>
            <div className='detailHomeBanner'>
                <p>Fresh Vegetable & Fruits</p>
                <Link to='/shop?catid=sweets&subid=vegetable'>order now</Link>
            </div>
            <img src='http://localhost:3000/static/media/chocolates.471de7f0776ac206769c.png'></img>
        </div>
    </div>
  )
}

export default HomeBanner