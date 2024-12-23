import React from 'react';
import { Product } from '../../types/Product';
import { useNavigate } from 'react-router-dom';
import ProductImageElement from '../atoms/ProductImageElement';
import Button from '../atoms/Button';

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
    let navigate = useNavigate();
    return (
        <div className="w-1/4 p-2 max-w-xs rounded overflow-hidden shadow-lg bg-slate-900 m-2" id={product.productId?.toString()}>
            <ProductImageElement
                image={product.productImages?.[0]}
                alt={product.name}
                className="w-full"
            />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{product.name}</div>
                <p className="text-white text-base">{product.unitPrice.toFixed(2)}₺</p>
            </div>
            <div className="px-3 pt-4 pb-2">
                <Button onClick={() => onAddToCart(product)} className="inline-block focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2.5 me-3 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Sepete Ekle</Button>
                <Button onClick={() => navigate("/products/detail/" + product.productId)} className="inline-block text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Detay</Button>
            </div>
        </div>
    );
};

export default ProductCard;