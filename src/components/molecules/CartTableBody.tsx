import React from 'react';
import { CartItem } from '../../types/CartItem';
import Button from '../atoms/Button';
import ButtonStyles from '../../styles/ButtonStyles';
import { Plus, Minus } from 'lucide-react';

interface CartTableBodyProps {
    cartItems: { cart: CartItem[] } | undefined;
    updateCartItem: (productId: number, quantity: number) => void;
    deleteCartItem: (productId: number) => void;
}

const CartTableBody: React.FC<CartTableBodyProps> = ({ cartItems, updateCartItem, deleteCartItem }) => {
    if (cartItems?.cart.length === 0) {
        return (
            <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-6 py-4 text-center" colSpan={5}>No items in the cart</td>
                </tr>
            </tbody>
        );
    }

    return (
        <tbody>
            {cartItems?.cart.map((item, index) => (
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 pl-3 text-center">{item.product!.name}</th>
                    <td className="px-6 py-4 text-center">{item.product!.unitPrice}₺</td>
                    <td className="px-6 py-4 text-center" style={{ alignItems: 'center' }}>
                        <Button onClick={() => updateCartItem(item.product!.productId!, item.quantity - 1)}
                            className='text-xs font-medium text-center h-6 pt-1.5' style={ButtonStyles.BLUE}>
                            <Minus size={12} />
                        </Button>
                        <span className='p-3'>{item.quantity}</span>
                        <Button onClick={() => updateCartItem(item.product!.productId!, item.quantity + 1)}
                            className='text-xs font-medium text-center h-6 pt-1.5' style={ButtonStyles.BLUE}>
                            <Plus size={12} />
                        </Button>
                    </td>
                    <td className="px-6 py-4 text-center">{item.product!.unitPrice * item.quantity}₺</td>
                    <td className="px-6 py-4 text-center">
                        <Button onClick={() => deleteCartItem(item.product!.productId!)}
                            className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-0 me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>
                            Remove
                        </Button>
                    </td>
                </tr>
            ))}
        </tbody>
    );
};

export default CartTableBody;