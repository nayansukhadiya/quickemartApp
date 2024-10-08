import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import UserContextProvider from './context/UserContextProvider';
import BottomNav from './components/BottomNav';
import ChatBg from './components/ChatBg';

function Layout() {
  const [searchActive, setSearchActive] = useState(false);
  const [chatBgSet, setChatBgSet] = useState(false);
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
      setChatBgSet(true); // Show ChatBg when path is /chat
    } else {
      setChatBgSet(false); // Hide ChatBg when path is anything else
    }
  }, [location]);

  return (
    <UserContextProvider>
      <Navbar />
      <div className="main">
        <Outlet />
      </div>
      {!searchActive &&  <BottomNav />}
      {chatBgSet && <ChatBg />} {/* Show ChatBg when chatBgSet is true */}
    </UserContextProvider>
  );
}

export default Layout;
