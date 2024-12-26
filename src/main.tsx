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
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { JwtPayloadExtend } from './types/JwtPayloadExtend';
import AdminMenu from './components/pages/Admin/AdminMenu';
import AdminCategory from './components/pages/Admin/Category/AdminCategory';
import AdminCategoryEdit from './components/pages/Admin/Category/AdminCategoryEdit';
import AdminCategoryAdd from './components/pages/Admin/Category/AdminCategoryAdd';
import AdminCountry from './components/pages/Admin/Country/AdminCountry';
import AdminCountryAdd from './components/pages/Admin/Country/AdminCountryAdd';
import AdminCountryEdit from './components/pages/Admin/Country/AdminCountryEdit';
import AdminProduct from './components/pages/Admin/Product/AdminProduct';
import AdminProductAdd from './components/pages/Admin/Product/AdminProductAdd';
import AdminProductEdit from './components/pages/Admin/Product/AdminProductEdit';
import AdminShipmentCompany from './components/pages/Admin/AdminShipmentCompany/AdminShipmentCompany';
import AdminShipmentCompanyAdd from './components/pages/Admin/AdminShipmentCompany/AdminShipmentCompanyAdd';
import AdminShipmentCompanyEdit from './components/pages/Admin/AdminShipmentCompany/AdmnShipmentCompanyEdit';
import AdminProductImage from './components/pages/Admin/Product/AdminProductImage';
import AdminProductStock from './components/pages/Admin/Product/AdminProductStock';
import OrderDetail from './components/pages/OrderDetail';

const token = Cookies.get('token');
const isAdmin = token ? jwtDecode<JwtPayloadExtend>(token)['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'Admin' : false;

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
            <Route path='/products/:productId' element={<ProductDetail />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/detail/:orderId" element={<OrderDetail />} />
            {isAdmin &&
              <>
                <Route path="/admin" element={<AdminMenu />} />
                <Route path="/admin/category" element={<AdminCategory />} />
                <Route path="/admin/category/edit/:categoryId" element={<AdminCategoryEdit />} />
                <Route path="/admin/category/add" element={<AdminCategoryAdd />} />
                <Route path="/admin/country" element={<AdminCountry />} />
                <Route path="/admin/country/edit/:countryId" element={<AdminCountryEdit />} />
                <Route path="/admin/country/add" element={<AdminCountryAdd />} />
                <Route path="/admin/product" element={<AdminProduct />} />
                <Route path="/admin/product/add" element={<AdminProductAdd />} />
                <Route path="/admin/product/edit/:productId" element={<AdminProductEdit />} />
                <Route path="/admin/product/image/:productId" element={<AdminProductImage />} />
                <Route path="/admin/product/stock/:productId" element={<AdminProductStock />} />
                <Route path="/admin/shipment-company" element={<AdminShipmentCompany />} />
                <Route path="/admin/shipment-company/add" element={<AdminShipmentCompanyAdd />} />
                <Route path="/admin/shipment-company/edit/:shipmentCompanyId" element={<AdminShipmentCompanyEdit />} />
              </>
            }
          </Routes>
          <FooterComponent />
        </Suspense>
      </React.Fragment>
    </BrowserRouter>
  </StrictMode>
);