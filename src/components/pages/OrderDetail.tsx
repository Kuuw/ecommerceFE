import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Order } from '../../types/Order';
import useOrderService from '../../services/OrderService';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import Button from '../atoms/Button';
import ButtonStyles from '../../styles/ButtonStyles';
import ProductImageElement from '../atoms/ProductImageElement';
import TableHead from '../molecules/TableHead';

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
        <div className='p-10 pl-20'>
            <Button style={ButtonStyles.BLUE} className='mb-5' onClick={() => navigate('/orders')}>Back to Orders</Button>
            <h2 className='text-2xl font-semibold mb-4 dark:text-white text-black'>Order Details</h2>
            <p className='dark:text-white text-black'><strong>Order ID:</strong> {order.orderId}</p>
            <p className='dark:text-white text-black'><strong>Address:</strong> {order.address?.firstName} {order.address?.lastName} / {order.address?.postalCode}</p>
            <p className='dark:text-white text-black'><strong>Shipment Tracking:</strong> {order.shipmentTrack}</p>
            <h3 className='text-xl font-semibold mt-4 dark:text-white text-black'>Products</h3>
            <table className='table-auto border-collapse border border-gray-200 w-1/2'>
                <TableHead columns={['Image', 'Name', 'Quantity', 'Unit Price']} />
                {order.orderItems.map((item) => (
                    <tr key={item.productId} className='border-b'>
                        <td className='border border-gray-300 px-4 py-2 text-center dark:text-white text-black'>
                            <ProductImageElement image={item.product?.productImages?.[0]} className='w-12 h-12 inline-block mr-2' />
                        </td>
                        <td className='border border-gray-300 px-4 py-2 text-center dark:text-white text-black'>{item.product?.name}</td>
                        <td className='border border-gray-300 px-4 py-2 text-center dark:text-white text-black'>{item.quantity}</td>
                        <td className='border border-gray-300 px-4 py-2 text-center dark:text-white text-black'>{item.unitPrice}₺</td>
                    </tr>
                ))}
            </table>
            <p className='mt-4 dark:text-white text-black'><strong>Total Price:</strong> {calculateTotalPrice(order)}₺</p>
        </div>
    );
};

export default OrderDetail;