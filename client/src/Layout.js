import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useLocation } from 'react-router-dom';
import UserContextProvider from './context/UserContextProvider';
import BottomNav from './components/BottomNav';

function Layout() {
  const [searchActive, setSearchActive] = useState(false);
  const location = useLocation(); 

  useEffect(() => {
    const currentPath = location.pathname; 
    if (currentPath === "/search" || currentPath === "/chat") {
      setSearchActive(true);
    } else {
      setSearchActive(false);
    }
  }, [location]);

  return (
    <UserContextProvider>
      <Navbar />
      <div className="main">
        <Outlet />
      </div>
      {!searchActive &&  <BottomNav />}
    </UserContextProvider>
  );
}

export default Layout;
