import React, { useEffect, useState } from 'react';
import useProductService from '../../services/ProductService';
import useCartService from '../../services/CartService';
import { Product } from '../../types/Product';
import toast from 'react-hot-toast';
import Button from '../atoms/Button';
import ButtonStyles from '../../styles/ButtonStyles';
import ProductImageElement from '../atoms/ProductImageElement';
import { useParams } from 'react-router-dom';

const ProductDetail: React.FC = () => {
    const productService = new useProductService();
    const cartService = new useCartService();
    const [product, setProduct] = useState<Product | null>(null);
    const { productId } = useParams();

    const fetchProduct = async () => {
        if (productId) {
            const response = await productService.getById(Number(productId));
            setProduct(response.data);
        }
    };

    const handleAddToCart = () => {
        if (product?.productId) {
            const promise = cartService.put({ productId: product.productId, quantity: 1, product: undefined });
            toast.promise(promise, {
                loading: 'Adding to cart...',
                success: 'Product added to cart',
                error: 'Error adding product to cart'
            });
        }
    }

    useEffect(() => {
        fetchProduct();
    }, [productId]);

    if (!product) {
        return <div>Loading...</div>;
    }
    if (product.productId == undefined || product.productId == null) {
        return <div>Loading...</div>;
    }

    return (
        <div className="m-10 w-full mt-48">
            <div className='flex w-full align-middle justify-center'>
                <div className='flex-col text-center'>
                    <ProductImageElement image={product.productImages?.[0]} alt={product.name} className="max-w-[400px]" />
                </div>
                <div className='flex-col'>
                    <h1 className="text-2xl font-bold dark:text-white text-black">{product.name}</h1>
                    <p className="text-lg dark:text-white text-black">{product.description}</p>
                    <p className="text-lg dark:text-white text-black">{product.unitPrice}₺</p>
                    <div className='flex-row mt-5'>
                        <Button onClick={handleAddToCart} style={ButtonStyles.GREEN}>Add to cart</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;