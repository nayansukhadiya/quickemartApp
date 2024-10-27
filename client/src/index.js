import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom'; 
import Layout from './Layout';
import Shop from './pages/Shop';
import Home from './pages/Home';
import Search from './pages/Search';
import ProDetailPage from './pages/ProDetailPage';
import Cart from './pages/Cart';
import Account from './pages/Account';
import ChatPage from './pages/ChatPage';
import CartGen from './pages/CartGen';
import Category from './pages/Category';
import Login from './pages/Login';
import Sighin from './pages/Sighin';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home/>}/>
      <Route path="shop" element={<Shop />} />
      <Route path='search' element={<Search />}/>
      <Route path='detail' element={<ProDetailPage />}/>
      <Route path='chat' element={<ChatPage />}/>
      <Route path='cart' element={<Cart />}/>
      <Route path='account' element={<Account />}/>
      <Route path='cartgen' element={<CartGen />}/>
      <Route path='category' element={<Category />}/>
      <Route path='login' element={<Login />}/>
      <Route path='sighin' element={<Sighin />}/>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

reportWebVitals();
