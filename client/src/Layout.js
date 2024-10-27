import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import UserContextProvider from './context/UserContextProvider';
import BottomNav from './components/BottomNav';
import ChatBg from './components/ChatBg';
import CartAiBtn from './components/CartAiBtn';
import CartPop from './components/CartPop';

function Layout() {
  const [searchActive, setSearchActive] = useState(false);
  const [chatBgSet, setChatBgSet] = useState(false);
  const [hideNavbar, setHideNavbar] = useState(false);
  const [chatBtnHide, setChatBtnHide] = useState(false);
  const [cartPopAnim, setCartPopAnim] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    setSearchActive(['/search', '/chat', '/cartgen', '/cart', '/detail'].includes(currentPath));
    setChatBgSet(currentPath === '/chat');
    setChatBtnHide(['/chat', '/cartgen'].includes(currentPath));
    setCartPopAnim(['/chat', '/cart'].includes(currentPath));
    setHideNavbar(currentPath === '/login' || currentPath === '/sighin');
  }, [currentPath]);

  return (
    <UserContextProvider>
      {!hideNavbar && <Navbar />}
      {!chatBtnHide && <CartAiBtn />}
      <div className={`main ${hideNavbar ? 'mobileShop' : ''}`}>
        <Outlet />
      </div>
      {!cartPopAnim && <CartPop />}
      {!searchActive && <BottomNav />}
      {chatBgSet && <ChatBg />}
    </UserContextProvider>
  );
}

export default Layout;
