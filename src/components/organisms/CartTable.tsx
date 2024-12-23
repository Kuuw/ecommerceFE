import React from 'react';
import { CartItem } from '../../types/CartItem';
import CartTableHead from '../molecules/CartTableHead';
import CartTableBody from '../molecules/CartTableBody';

interface CartTableProps {
    cartItems: { cart: CartItem[] } | undefined;
    updateCartItem: (productId: number, quantity: number) => void;
    deleteCartItem: (productId: number) => void;
}

const CartTable: React.FC<CartTableProps> = ({ cartItems, updateCartItem, deleteCartItem }) => {
    return (
        <table className='table-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
            <CartTableHead columns={["Product", "Price", "Quantity", "Total", "Remove"]} />
            <CartTableBody cartItems={cartItems} updateCartItem={updateCartItem} deleteCartItem={deleteCartItem} />
        </table>
    );
};

export default CartTable;