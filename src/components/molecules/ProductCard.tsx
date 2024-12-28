import React from 'react';
import { Product } from '../../types/Product';
import { useNavigate } from 'react-router-dom';
import ProductImageElement from '../atoms/ProductImageElement';
import Button from '../atoms/Button';
import ButtonStyles from '../../styles/ButtonStyles';

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
    let navigate = useNavigate();
    return (
        <div className="w-1/4 p-2 max-w-xs rounded overflow-hidden shadow-lg bg-gray-300 dark:bg-slate-900 m-2" id={product.productId?.toString()}>
            <ProductImageElement
                image={product.productImages?.[0]}
                alt={product.name}
                className="w-full"
            />
            <div className="px-6 py-4">
                <div className="text-black dark:text-white font-bold text-xl mb-2">{product.name}</div>
                <p className="text-black dark:text-white text-base">{product.unitPrice.toFixed(2)}₺</p>
            </div>
            <div className="px-3 pt-4 pb-2">
                <Button onClick={() => onAddToCart(product)} className="inline-block focus:outline-none mr-2" style={ButtonStyles.GREEN}>Sepete Ekle</Button>
                <Button onClick={() => navigate("/products/detail/" + product.productId)} className="inline-block text-white" style={ButtonStyles.BLUE}>Detay</Button>
            </div>
        </div>
    );
};

export default ProductCard;