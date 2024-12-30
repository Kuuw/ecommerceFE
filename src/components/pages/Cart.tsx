import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCartService from '../../services/CartService';
import userOrderService from '../../services/OrderService';
import useAddressService from '../../services/AddressService';
import Cookies from 'js-cookie';
import type { Cart } from '../../types/Cart';
import toast from 'react-hot-toast';
import { Address } from '../../types/Address';
import CartTable from '../organisms/CartTable';
import Button from '../atoms/Button';
import ButtonStyles from '../../styles/ButtonStyles';
import Select from '../atoms/Select';

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
        if (quantity <= 0) {
            deleteCartItem(productId);
            return;
        }
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
            return { productId: item.product.productId, quantity: item.quantity, unitPrice: item.product.unitPrice, product: null };
        });

        if (!items) {
            toast.error('No items in the cart');
            return;
        }
        const selectedAddress = addresses?.find(addr => addr.addressId === addressId) || null;
        const data = await orderService.post({ orderId: null, addressId: addressId, shipmentCompanyId: null, shipmentTrack: null, orderItems: items, address: selectedAddress });
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
            <div className='relative overflow-x-auto'>
                <CartTable cartItems={cartItems} updateCartItem={updateCartItem} deleteCartItem={deleteCartItem} />
                <div className='flex pt-3'>
                    <div className='w-full p-2 dark:text-white text-right text-base text-black'>
                        Total: {calculateTotal()}₺
                    </div>
                    <Select onChange={(e) => setAddressId(parseInt(e.target.value))}
                        className=" dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-3 w-full"
                        placeholder="Select an address"
                        value={addressId?.toString()!}
                        options={addresses?.map((address) => ({ value: address.addressId?.toString()!, label: `${address.firstName} ${address.lastName} / ${address.postalCode}` })) || []}
                    />
                    <Button onClick={checkout}
                        className='font-medium text-sm' style={ButtonStyles.GREEN}>
                        Checkout
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Cart;