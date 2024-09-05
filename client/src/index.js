import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom'; 
import Layout from './Layout';
import Shop from './pages/Shop';
import Home from './pages/Home'
import Search from './pages/Search'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home/>}/>
      <Route path="shop" element={<Shop />} />
      <Route path='search' element={<Search />}/>
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
