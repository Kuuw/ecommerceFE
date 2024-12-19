import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import Navbar from './components/Navbar';
import HomeView from './views/HomeView';
import SignInView from './views/account/SignInView';
import SignUpView from './views/account/SignUpView';
import CartView from './views/order/CartView';
import { FooterComponent } from './components/Footer';
import AddressView from './views/account/AddressView';
import AddAddressView from './views/account/AddAddressView';
import EditAddressView from './views/account/EditAddressView';
/* import ForgotPasswordView from './views/account/ForgotPasswordView';
import MyProfileView from './views/account/MyProfileView';
import OrdersView from './views/order/OrdersView';
import ProductListView from './views/product/ProductListView';
import ProductDetailView from './views/product/ProductDetailView';
import CheckoutView from './views/order/CheckoutView';
import ContactUsView from './views/ContactUsView';
import InternalServerErrorView from './views/error/InternalServerErrorView';
import NotFoundView from './views/error/NotFoundView'; */

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <React.Fragment>
        <Navbar />
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
            {/*<Route
              path="/account/forgotpassword"
              element={<ForgotPasswordView />}
            />
            <Route path="/account/profile" element={<MyProfileView />} />
            <Route path="/account/orders" element={<OrdersView />} />
            <Route path="/category" element={<ProductListView />} />
            <Route path="/product/detail" element={<ProductDetailView />} />
            <Route path="/checkout" element={<CheckoutView />} />
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