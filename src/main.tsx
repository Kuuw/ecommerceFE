import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import Navbar from './components/organisms/Navbar';
import HomeView from './views/HomeView';
import SignInView from './views/account/SignInView';
import SignUpView from './views/account/SignUpView';
import CartView from './views/order/CartView';
import { FooterComponent } from './components/organisms/Footer';
import AddressView from './views/account/AddressView';
import AddAddressView from './views/account/AddAddressView';
import EditAddressView from './views/account/EditAddressView';
import OrdersView from './views/order/OrdersView';
import ProductDetailView from './views/product/ProductDetailView';
import { Toaster } from 'react-hot-toast';
/* import ForgotPasswordView from './views/account/ForgotPasswordView';
import MyProfileView from './views/account/MyProfileView';
import ContactUsView from './views/ContactUsView';
import InternalServerErrorView from './views/error/InternalServerErrorView';
import NotFoundView from './views/error/NotFoundView'; */

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
            <Route path="/" element={<HomeView />} />
            <Route path="/account/signin" element={<SignInView />} />
            <Route path="/account/signup" element={<SignUpView />} />
            <Route path="/account/addresses" element={<AddressView />} />
            <Route path="/account/addresses/add" element={<AddAddressView />} />
            <Route path="/account/addresses/edit/:addressId" element={<EditAddressView />} />
            <Route path="/cart" element={<CartView />} />
            <Route path="/orders" element={<OrdersView />} />
            <Route path="/products/detail/:productId" element={<ProductDetailView />} />
            {/*<Route
              path="/account/forgotpassword"
              element={<ForgotPasswordView />}
            />
            <Route path="/account/profile" element={<MyProfileView />} />
            <Route path="/contact-us" element={<ContactUsView />} />
            <Route path="/500" element={<InternalServerErrorView />} />
            <Route path="*" element={<NotFoundView />} /> */}

          </Routes>
          <FooterComponent />
        </Suspense>
      </React.Fragment>
    </BrowserRouter>
  </StrictMode>
);