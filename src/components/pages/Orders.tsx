import React, { useState, useEffect } from 'react';
import { Order } from '../../types/Order';
import useOrderService from '../../services/OrderService';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { redirect } from 'react-router-dom';
import Button from '../atoms/Button';
import ButtonStyles from '../../styles/ButtonStyles';

const Orders: React.FC = () => {
    const orderService = new useOrderService();

    const [orders, setOrders] = useState<Order[]>([]);

    const loggedIn = Cookies.get('token') != null;

    const fetchOrders = async () => {
        if (!loggedIn) {
            redirect('/account/signin');
            return;
        }
        try {
            const response = await orderService.get();
            if (response.status === 200) {
                setOrders(response.data);
            } else {
                toast.error('Error fetching orders');
                console.error('Response status:', response.status);
            }
        } catch (error) {
            toast.error('Unexpected error fetching orders');
            console.error('Unexpected error:', error);
        }
    };

    const calculateTotalPrice = (order: Order): number => {
        return order.orderItems.reduce((acc, product) => acc + product.unitPrice, 0);
    }

    useEffect(() => {
        fetchOrders();
    }, []);


    return (
        <div className='m-5'>
            <div className='flex flex-wrap'>
                {orders.map((order) => (
                    <div key={order.orderId} className="bg-slate-900 dark:bg-dark-2 rounded-lg p-4 mb-4 mr-4 max-w-[500px] flex-shrink-0">
                        <div className="flex justify-between">
                            <div>
                                <h3 className="text-lg font-semibold mr-2">Order ID: {order.orderId}</h3>
                                <p className="text-sm">Total Price: {calculateTotalPrice(order)}₺</p>
                            </div>
                            <div>
                                <Button style={ButtonStyles.BLUE} className='ml-2'>Details</Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;
