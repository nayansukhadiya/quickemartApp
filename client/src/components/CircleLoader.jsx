import React from 'react'
import '../style/CircleLoader.css'
function CircleLoader() {
  return (
    <div className="loaderSec"> 
    <div className="loader">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
    </div>
    </div>
  )
}

export default CircleLoader