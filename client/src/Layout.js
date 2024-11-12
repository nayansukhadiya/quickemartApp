import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import UserContextProvider from './context/UserContextProvider';
import BottomNavBar from './components/BottomNavbar/BottomNavBar'; // Corrected folder name
import ChatBg from './pages/ChatPage/ChatBg'; // Ensure ChatBg is part of ChatPage
import CartAiBtn from './components/chatAiBtn/CartAiBtn'; // Corrected folder name
import CartPopUp from './components/cartPopupDiv/CartPopUp'; // Corrected folder name
import BingAddressAutoSuggest from './components/BingMap/BingAddressAutoSuggest';
import LogoImg from "./assets/images/quickAi.svg";



function Layout() {
  const [searchActive, setSearchActive] = useState(false);
  const [chatBgSet, setChatBgSet] = useState(false);
  const [searchBarRem,setSearchBarRem] = useState(false);
  const [chatBtnHide,setChatBtnHide] = useState(false);
  const [CartPopUpAnim,setCartPopUpAnim] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation(); 
  
  useEffect(() => {
    const currentPath = location.pathname; 
    if (currentPath === "/chat" || currentPath === "/CartGeneratorPage"  || currentPath === "/cart" || currentPath === "/detail" || currentPath === "/brand") {
      setSearchActive(true);
    } else {
      setSearchActive(false);
    }
  }, [location]);
  
  useEffect(() => {
    const currentPath = location.pathname; 
    if (currentPath === "/chat") {
      setChatBgSet(true); 
    } else {
      setChatBgSet(false); 
    }
  }, [location]);
  useEffect(() => {
    const currentPath = location.pathname; 
    if (currentPath === "/chat" || currentPath === "/CartGeneratorPage") {
      setChatBtnHide(true); 
    } else {
      setChatBtnHide(false); 
    }
  }, [location]);
  useEffect(() => {
    const currentPath = location.pathname; 
    if (currentPath === "/chat" || currentPath === "/cart") {
      setCartPopUpAnim(true); 
    } else {
      setCartPopUpAnim(false); 
    }
  }, [location]);
  useEffect(()=> {
    const currentPath = location.pathname; 
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile || currentPath === "/chat") { 
      setSearchBarRem(true);
    } else {
      setSearchBarRem(false);
    }
    if(isMobile){
      setIsMobile(true);
    }else{
      setIsMobile(false);
    }
  }, [location])

  return (
    <UserContextProvider>
      <BingAddressAutoSuggest />
      {!searchBarRem &&  <Navbar />}
      {!chatBtnHide &&  <CartAiBtn />}
      <div className={`main  ${isMobile ? "mobileShop" : ""} ${chatBgSet ? "MainChat" : ""}`}>
        <Outlet />
      </div>
      {!CartPopUpAnim &&  <CartPopUp />}
      {!searchActive &&  <BottomNavBar />}
      {chatBgSet && <ChatBg />} 
      {chatBgSet && <div className='chatLogo'> <Link to={'/'}><img src={LogoImg} alt='img' /></Link></div>} 

    </UserContextProvider>
  );
}

export default Layout;
