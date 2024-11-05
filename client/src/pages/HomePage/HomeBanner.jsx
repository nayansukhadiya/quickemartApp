import React from 'react'
import { Link } from "react-router-dom";
import './HomeBanner.css'


function HomeBanner() {
let arr = ["parle","cornitos","nescafe","bru","doritos"]
let arr2 = ["dawwat","india"]
    return (
        <>
    <div className='HomeBannerSection'>
        {arr.map((item) => (
            <div className='HomeBannerBox'>
        <img src={require(`../../assets/images/banner/${item}.png`)} alt="img"/>
        </div>
        ))}
                    </div>
        <p>Best Deal</p>
                <div className='HomeBannerSection'>
        {arr2.map((item) => (
            <div className='HomeBannerBox2'>
        <img src={require(`../../assets/images/banner/focusBrand/${item}.png`)} alt="img"/>
        </div>
        ))}
    </div>
        </>
  )
}

export default HomeBanner