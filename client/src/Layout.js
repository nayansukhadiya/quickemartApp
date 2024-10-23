import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import UserContextProvider from './context/UserContextProvider';
import BottomNav from './components/BottomNav';
import ChatBg from './components/ChatBg';
import CartAiBtn from './components/CartAiBtn';

function Layout() {
  const [searchActive, setSearchActive] = useState(false);
  const [chatBgSet, setChatBgSet] = useState(false);
  const [searchBarRem,setSearchBarRem] = useState(false);
  const [chatBtnHide,setChatBtnHide] = useState(false);
  const location = useLocation(); 
  
  useEffect(() => {
    const currentPath = location.pathname; 
    if (currentPath === "/search" || currentPath === "/chat" || currentPath === "/cartgen"  || currentPath === "/cart" || currentPath === "/detail") {
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
    if (currentPath === "/chat" || currentPath === "/cartgen") {
      setChatBtnHide(true); 
    } else {
      setChatBtnHide(false); 
    }
  }, [location]);
  useEffect(()=> {
    const currentPath = location.pathname; 
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if(isMobile && currentPath === "/" || currentPath === "/search" ){  
      setSearchBarRem(false);
    }else if(!isMobile){
      setSearchBarRem(false);
    } else {
      setSearchBarRem(true);
    }
  }, [location])

  return (
    <UserContextProvider>
      {!searchBarRem &&  <Navbar />}
      {!chatBtnHide &&  <CartAiBtn />}
      <div className={`main ${searchBarRem ? "mobileShop" : ""}`}>
        <Outlet />
      </div>
      {!searchActive &&  <BottomNav />}
      {chatBgSet && <ChatBg />} 
    </UserContextProvider>
  );
}

export default Layout;
