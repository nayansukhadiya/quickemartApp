import React from 'react'
import { Link } from "react-router-dom";
import './logo.css'
import LogoImg from '../../assets/images/quicke.png'
function Logo() {
  return (
    <div className="logo-section">
    <Link to='/'><img src={LogoImg} alt='img'/></Link>
    </div>
  )
}

export default Logo