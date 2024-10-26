import React from 'react'
import { Link, NavLink } from "react-router-dom";
import '../style/logo.css'
import LogoImg from '../assets/logo/quicke.png'
function Logo() {
  return (
    <div className="logo-section">
    <Link to='/'><img src={LogoImg}/></Link>
    </div>
  )
}

export default Logo