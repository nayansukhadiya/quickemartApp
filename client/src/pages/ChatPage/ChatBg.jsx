import React from 'react'
import '../../style/index.css';
import bg from '../../assets/video/bg2.mp4'

function ChatBg() {
  return (
    <div className='chatBg'>
      <div className='Layer'></div>
      <video
        src={bg}
        autoPlay
        loop
        muted
        playsInline
        className="backgroundVideo"
      ></video>
    </div>
  )
}

export default ChatBg;
