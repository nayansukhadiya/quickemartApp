import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import UserContextProvider from './context/UserContextProvider';
import BottomNav from './components/BottomNav';
import ChatBg from './components/ChatBg';

function Layout() {
  const [searchActive, setSearchActive] = useState(false);
  const [chatBgSet, setChatBgSet] = useState(false);
  const [searchBarRem,setSearchBarRem] = useState(false);
  const location = useLocation(); 
  
  useEffect(() => {
    const currentPath = location.pathname; 
    if (currentPath === "/search" || currentPath === "/chat" || currentPath === "/cartgen") {
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
  
  useEffect(()=> {
    const currentPath = location.pathname; 
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if(isMobile && currentPath === "/shop"){  
    setSearchBarRem(true);
    } else {
      setSearchBarRem(false);
    }
  }, [location])

  return (
    <UserContextProvider>
      {!searchBarRem &&  <Navbar />}
      <div className={`main ${searchBarRem ? "mainShop" : ""}`}>
        <Outlet />
      </div>
      {!searchActive &&  <BottomNav />}
      {chatBgSet && <ChatBg />} 
    </UserContextProvider>
  );
}

export default Layout;
