import React from 'react'
import { Link, NavLink } from "react-router-dom";
import '../style/logo.css'
function Logo() {
  return (
    <div className="logo-section">
    <Link to='/'><h3>RapidShop</h3></Link>
    </div>
  )
}

export default Logo