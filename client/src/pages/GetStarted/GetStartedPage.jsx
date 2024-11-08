import React from 'react'
import newSvg from '../../assets/images/newsvg.svg';
import './GetStartedPage.css'
import bg from '../../assets/video/bg1.png'

function GetStartedPage() {
  return (
    <div className='GetStartedPage'>
      {/* <img src={bg} className='BgGetStarted'/> */}
    <div className='SvgSec'>
      <img src={newSvg}/>
    </div>
    <div className='ContentSec'>
      <h1>"Just Prompt, We’ll Handle the Rest!"</h1>
      <h2>AI-Driven Shopping, Faster than Ever! Goodbye to Time-Wasting Trips.</h2>
   <button>Start Shopping <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg></button>
    </div>
    </div>
  )
}

export default GetStartedPage