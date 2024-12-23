import React from 'react';
import type { ProductImage } from '../../types/ProductImage';

type ProductImageElementProps = {
    image?: ProductImage;
    alt?: string;
    className?: string;
};

const ProductImageElement: React.FC<ProductImageElementProps> = ({ image, className, alt }) => {
    return (
        <div>
            <img
                src={`${image?.imagePath ?? import.meta.env.VITE_IMAGE_PLACEHOLDER}`}
                alt={`Product image${alt && " of " + alt}`}
                className={className}
            />
        </div>
    );
};

export default ProductImageElement;