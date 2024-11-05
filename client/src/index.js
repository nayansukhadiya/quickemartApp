import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom'; 
import Layout from './Layout';
import Shop from './pages/ShopPage/Shop'; // Adjusted import
import Home from './pages/HomePage/Home'; // Adjusted import
import Search from './pages/SearchPage/Search'; // Adjusted import
import ProductDetailPage from './pages/ProductDetailPage/ProDetailPage'; // Adjusted import
import Cart from './pages/CartPage/Cart'; // Adjusted import
import Account from './pages/AccountPage/Account'; // Adjusted import
import ChatPage from './pages/ChatPage/ChatPage'; // Adjusted import
import CartGeneratorPage from './pages/CartGeneratorPage/CartGeneratorPage'; // Adjusted import
import Category from './pages/CategoryPage/Category'; 
import BrandPage from './pages/BrandPage/BrandPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home/>}/>
      <Route path="shop" element={<Shop />} />
      <Route path='search' element={<Search />}/>
      <Route path='detail' element={<ProductDetailPage />}/>
      <Route path='chat' element={<ChatPage />}/>
      <Route path='cart' element={<Cart />}/>
      <Route path='account' element={<Account />}/>
      <Route path='CartGeneratorPage' element={<CartGeneratorPage />}/>
      <Route path='category' element={<Category />}/>
      <Route path='brand' element={<BrandPage />}/>
      {/* <Route path='login' element={<Login />}/>
      <Route path='sighin' element={<Sighin />}/> */}
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
