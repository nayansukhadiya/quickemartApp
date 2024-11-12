import React from 'react'
import '../../style/index.css';
import bg from '../../assets/video/bg3.mp4'

function ChatBg() {
  return (
    <div className='chatBg'>
      <div className='Layer'></div>
      {/* <video
        src={bg}
        autoPlay
        loop
        muted
        playsInline
        className="backgroundVideo"
      ></video> */}
      <div className="backgroundBG"></div>
    </div>
  )
}

export default ChatBg;
