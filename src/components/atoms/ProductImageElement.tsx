import React from 'react';
import type { ProductImage } from '../../types/ProductImage';
import { formatImagePath } from '../../utils/imagePathFormatter';

type ProductImageElementProps = {
    image?: ProductImage;
    alt?: string;
    className?: string;
};

const ProductImageElement: React.FC<ProductImageElementProps> = ({ image, className, alt }) => {
    var path = image?.imagePath ? formatImagePath(image.imagePath) : import.meta.env.VITE_IMAGE_PLACEHOLDER;

    return (
        <div>
            <img
                src={path}
                alt={`Product image${alt && " of " + alt}`}
                className={className}
            />
        </div>
    );
};

export default ProductImageElement;