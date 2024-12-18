import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCartService from '../hooks/useCartService';
import Cookies from 'js-cookie';
import type { Cart } from '../types/Cart';
import toast, { Toaster } from 'react-hot-toast';

const Cart: React.FC = () => {
    let navigate = useNavigate();

    const cartService = new useCartService();

    const isLoggedIn = Cookies.get('token') != null;

    const [cartItems, setCartItems] = useState<Cart>();

    const fetchProducts = async () => {
        if (!isLoggedIn) {
            navigate('/account/signin');
            return;
        }
        const data = await cartService.get()
        if (data.status !== 200) {
            console.error('Response status:', data.status);
            toast.error('Error when fetching cart items');
            return;
        }
        setCartItems(data.data);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="m-10">
            <Toaster />
            <div>
                <table className='table-auto'>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems?.cart.map((item, index) => (
                            <tr key={index}>
                                <td>{item.product!.name}</td>
                                <td>{item.product!.unitPrice}</td>
                                <td>{item.quantity}</td>
                                <td>{item.product!.unitPrice * item.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Cart;