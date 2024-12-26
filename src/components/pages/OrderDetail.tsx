import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Order } from '../../types/Order';
import useOrderService from '../../services/OrderService';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import Button from '../atoms/Button';
import ButtonStyles from '../../styles/ButtonStyles';
import ProductImageElement from '../atoms/ProductImageElement';

const OrderDetail: React.FC = () => {
    const navigate = useNavigate();
    const orderService = new useOrderService();

    const [order, setOrder] = useState<Order | null>(null);

    const loggedIn = Cookies.get('token') != null;

    const { orderId } = useParams();

    const fetchOrder = async () => {
        if (!loggedIn) {
            navigate('/account/signin');
            return;
        }
        try {
            if (orderId === undefined) {
                console.error(orderId);
                toast.error('Order ID is missing');
                return;
            }
            const response = await orderService.getById(Number(orderId));
            if (response.status === 200) {
                setOrder(response.data);
            } else {
                toast.error('Error fetching order');
                console.error('Response status:', response.status);
            }
        } catch (error) {
            toast.error('Unexpected error fetching order');
            console.error('Unexpected error:', error);
        }
    };

    useEffect(() => {
        fetchOrder();
    }, [orderId]);

    const calculateTotalPrice = (order: Order): number => {
        return order.orderItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
    };

    if (!order) {
        return <div>Loading...</div>;
    }

    return (
        <div className='m-5'>
            <h2 className='text-2xl font-semibold mb-4'>Order Details</h2>
            <p><strong>Order ID:</strong> {order.orderId}</p>
            <p><strong>Address ID:</strong> {order.addressId}</p>
            <p><strong>Shipment Company ID:</strong> {order.shipmentCompanyId}</p>
            <p><strong>Shipment Tracking:</strong> {order.shipmentTrack}</p>
            <h3 className='text-xl font-semibold mt-4'>Products</h3>
            <ul>
                {order.orderItems.map((item) => (
                    <li key={item.productId}>
                        <ProductImageElement image={item.product.productImages?.[0]} className='w-12 h-12 inline-block mr-2' />
                        Product: {item.product.name}, Quantity: {item.quantity}, Unit Price: {item.unitPrice}₺
                    </li>
                ))}
            </ul>
            <p className='mt-4'><strong>Total Price:</strong> {calculateTotalPrice(order)}₺</p>
            <Button style={ButtonStyles.BLUE} className='mt-4' onClick={() => navigate('/orders')}>Back to Orders</Button>
        </div>
    );
};

export default OrderDetail;