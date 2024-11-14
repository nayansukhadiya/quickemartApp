import React from "react";
import "./Footer.css";
import Logo from "../logo/Logo";
function Footer() {
  return (
    <div className="Footer">
      <div className="LogoSectionFooter">
        <Logo />
      </div>
      <div className="FooterAbout">
        <h4 className="FooterTitle">About Website</h4>
        <div className="borderFaded"></div>
        <p>
          "Revolutionizing e-commerce with a custom AI-driven cart generator.
          Our Gemini model creates a seamless, fast shopping experience—just
          enter a prompt, and watch your cart fill with everything you need in
          seconds. Shopping made smarter, quicker, and more intuitive."
        </p>
      </div>
      <div className="TechnologyUsed">
        <h4 className="FooterTitle">Technology Used</h4>
        <div className="borderFaded"></div>
        <h5>
          <span>Special Tech</span> Custom Train Gemini Model
        </h5>
        <div className="TechLogoSec">
          <div className="TechLogo">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"
              alt="logo"
            />
          </div>
          <div className="TechLogo">
            <img
              src="https://static-00.iconduck.com/assets.00/node-js-icon-454x512-nztofx17.png"
              alt="logo"
            />
          </div>
          <div className="TechLogo">
            <img
              src="https://cdn.iconscout.com/icon/free/png-256/free-mongodb-logo-icon-download-in-svg-png-gif-file-formats--wordmark-programming-langugae-freebies-pack-logos-icons-1175140.png?f=webp"
              alt="logo"
            />
          </div>
          <div className="TechLogo">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Google_Gemini_logo.svg/2560px-Google_Gemini_logo.svg.png"
              alt="logo"
            />
          </div>
          <div className="TechLogo">
            <img
              src="https://pbs.twimg.com/profile_images/1271385506505347074/QIc_CCEg_400x400.jpg"
              alt="logo"
            />
          </div>
        </div>
        <div className="PersonalInfo">
        <h4 className="FooterTitle">About the Developer</h4>
        <div className="borderFaded"></div>
      <p>Hi, I'm Nayan Sukhadiya, a passionate MERN stack developer. Let's connect!</p>
      <p>Email: nayansukhadiya3105@gmail.com</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
