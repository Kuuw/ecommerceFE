import React from 'react';

interface CartTableHeadProps {
    columns: string[];
}

const CartTableHead: React.FC<CartTableHeadProps> = ({ columns }) => {
    return (
        <thead>
            <tr>
                {columns.map((column, index) => (
                    <th scope='col' className='px-6 py-3' key={index}>{column}</th>
                ))}
            </tr>
        </thead>
    );
};

export default CartTableHead;