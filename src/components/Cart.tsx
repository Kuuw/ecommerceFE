import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCartService from '../hooks/useCartService';
import userOrderService from '../hooks/useOrderService';
import useAddressService from '../hooks/useAddressService';
import Cookies from 'js-cookie';
import type { Cart } from '../types/Cart';
import toast, { Toaster } from 'react-hot-toast';
import { Address } from '../types/Address';

const Cart: React.FC = () => {
    let navigate = useNavigate();

    const cartService = new useCartService();
    const orderService = new userOrderService();
    const addressService = new useAddressService();

    const isLoggedIn = Cookies.get('token') != null;

    const [cartItems, setCartItems] = useState<Cart>();
    const [addresses, setAddresses] = useState<Address[]>();
    const [addressId, setAddressId] = useState<number>();

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

    const fetchAddresses = async () => {
        if (!isLoggedIn) {
            navigate('/account/signin');
            return;
        }
        const data = await addressService.get()
        if (data.status !== 200) {
            console.error('Response status:', data.status);
            toast.error('Error when fetching cart items');
            return;
        }
        setAddresses(data.data);
    };

    const deleteCartItem = async (productId: number) => {
        const data = await cartService.delete(productId);
        if (data.status !== 200) {
            console.error('Response status:', data.status);
            toast.error('Error when deleting cart item');
            return;
        }
        fetchProducts();
    };

    const updateCartItem = async (productId: number, quantity: number) => {
        const data = await cartService.put({
            productId, quantity,
            product: undefined
        });
        if (data.status !== 200) {
            console.error('Response status:', data.status);
            toast.error('Error when updating cart item');
            return;
        }
        fetchProducts();
    };

    const calculateTotal = () => {
        let total = 0;
        cartItems?.cart.forEach(item => {
            total += item.product!.unitPrice * item.quantity;
        });
        return total;
    };

    const checkout = async () => {
        if (addressId == undefined) {
            toast.error('Please select an address');
            return;
        }
        const items = cartItems?.cart.map(item => {
            if (item.product?.productId == null) {
                throw new Error('Product ID is missing');
            }
            deleteCartItem(item.product.productId);
            return { productId: item.product.productId, quantity: item.quantity, unitPrice: item.product.unitPrice };
        });

        if (!items) {
            toast.error('No items in the cart');
            return;
        }
        const data = await orderService.post({ orderId: null, addressId: addressId, shipmentCompanyId: null, shipmentTrack: null, orderItems: items });
        if (data.status !== 200) {
            console.error('Response status:', data.status);
            toast.error('Error when creating order');
            return;
        }
        toast.success('Order created successfully');


        fetchProducts();
    }

    useEffect(() => {
        fetchAddresses();
        fetchProducts();
    }, []);

    return (
        <div className="m-10">
            <Toaster />
            <div className='relative overflow-x-auto'>
                <table className='table-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                    <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                        <tr>
                            <th scope='col' className='px-6 py-3'>Product</th>
                            <th scope='col' className='px-6 py-3'>Price</th>
                            <th scope='col' className='px-6 py-3'>Quantity</th>
                            <th scope='col' className='px-6 py-3'>Total</th>
                            <th scope='col' className='px-6 py-3'>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems?.cart.map((item, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 pl-3">{item.product!.name}</th>
                                <td className="px-6 py-4">{item.product!.unitPrice}₺</td>
                                <td className="px-6 py-4 ">
                                    <div className='flex justify-items-center' style={{ alignItems: 'center' }}>
                                        <button onClick={() => updateCartItem(item.product!.productId!, item.quantity - 1)}
                                            className='px-2 py-0 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 h-6'>-</button>
                                        <span className='p-3'>{item.quantity}</span>
                                        <button onClick={() => updateCartItem(item.product!.productId!, item.quantity + 1)}
                                            className='px-2 py-0 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 h-6'>+</button>
                                    </div>
                                </td>
                                <td className="px-6 py-4">{item.product!.unitPrice * item.quantity}₺</td>
                                <td className="px-6 py-4">
                                    <button onClick={() => deleteCartItem(item.product!.productId!)}
                                        className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-0 me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='flex pt-3'>
                    <div className='w-full p-2 dark:text-white text-right text-base text-black'>
                        Total: {calculateTotal()}₺
                    </div>
                    <select onChange={(e) => setAddressId(parseInt(e.target.value))}
                        className="bg-slate-900 border border-gray-300 text-gray-900 mr-2 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="" disabled selected>Select an address</option>
                        {addresses?.map((address) => (
                            <option key={address.addressId} value={address.addressId?.toString()}>{address.firstName} {address.lastName} / {address.postalCode}</option>
                        ))}
                    </select>
                    <button onClick={checkout}
                        className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'>
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;