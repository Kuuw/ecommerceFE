import React from 'react';
import ProductDetail from '../../components/pages/ProductDetail';
import { useParams } from 'react-router-dom';

const ProductDetailView: React.FC = () => {
    const { productId } = useParams<{ productId: string }>() || { productId: '' };

    return (
        <div>
            <ProductDetail productId={productId || ''} />
        </div>
    );
};

export default ProductDetailView;