import React from 'react'
import { Link } from "react-router-dom";
import '../style/logo.css'
import LogoImg from '../assets/logo/quicke.png'
function Logo() {
  return (
    <div className="logo-section">
    <Link to='/'><img src={LogoImg} alt='img'/></Link>
    </div>
  )
}

export default Logo