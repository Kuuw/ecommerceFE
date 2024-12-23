import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import Navbar from './components/organisms/Navbar';
import { FooterComponent } from './components/organisms/Footer';
import { Toaster } from 'react-hot-toast';
import SignIn from './components/pages/SignIn';
import AddAddress from './components/pages/Address/AddAddress';
import Addresses from './components/pages/Address/Addresses';
import EditAddress from './components/pages/Address/EditAddress';
import Cart from './components/pages/Cart';
import Orders from './components/pages/Orders';
import ProductDetail from './components/pages/ProductDetail';
import SignUp from './components/pages/SignUp';
import Home from './components/pages/Home';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <React.Fragment>
        <Navbar />
        <Toaster />
        <Suspense
          fallback={
            <div className="text-white text-center mt-3">Loading...</div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/account/signin" element={<SignIn />} />
            <Route path="/account/signup" element={<SignUp />} />
            <Route path="/account/addresses" element={<Addresses />} />
            <Route path="/account/addresses/add" element={<AddAddress />} />
            <Route path="/account/addresses/edit/:addressId" element={<EditAddress />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/products/detail/:productId" element={<ProductDetail />} />
          </Routes>
          <FooterComponent />
        </Suspense>
      </React.Fragment>
    </BrowserRouter>
  </StrictMode>
);