import React from 'react';
import TableHead from '../molecules/TableHead';
import { Product } from '../../types/Product';
import ProductTableBody from '../molecules/ProductTableBody';

interface ProductTableProps {
    products: { products: Product[] } | undefined;
    deleteProduct: (productId: number) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({ products, deleteProduct }) => {
    return (
        <table className='table-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
            <TableHead columns={["Name", "Description", "Unit Price", "Stock", "Images", "Edit", "Remove"]} />
            <ProductTableBody products={products?.products ?? []} deleteProduct={deleteProduct} />
        </table>
    );
};

export default ProductTable;