import React from 'react';
import { Product } from '../../types/Product';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
    let navigate = useNavigate();
    return (
        <div className="w-1/4 p-2 max-w-xs rounded overflow-hidden shadow-lg" id={product.productId?.toString()}>
            <img
                src={product.productImages && product.productImages[0] ? product.productImages[0].imagePath : import.meta.env.VITE_IMAGE_PLACEHOLDER}
                alt={product.name}
                className="w-full"
            />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{product.name}</div>
                <p className="text-gray-700 text-base">{product.unitPrice.toFixed(2)}₺</p>
            </div>
            <div className="px-6 pt-4 pb-2">
                <button onClick={() => onAddToCart(product)} className="inline-block bg-green-300 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Sepete Ekle</button>
                <button onClick={() => navigate("/products/detail/" + product.productId)} className="inline-block bg-gray-300 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Detay</button>
            </div>
        </div>
    );
};

export default ProductCard;