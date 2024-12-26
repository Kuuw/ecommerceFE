import React from 'react';
import Button from '../atoms/Button';
import { ProductImage } from '../../types/ProductImage';
import ButtonStyles from '../../styles/ButtonStyles';

interface AdminProductImageCardProps {
    image: ProductImage;
    handleDeleteImage: (guid: string) => void;
}

const AdminProductImageCard: React.FC<AdminProductImageCardProps> = ({ image, handleDeleteImage }) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg relative m-4">
            <img src={image.imagePath} alt={`Product ${image.productId}`} className="w-full h-48 object-cover" />
            <Button
                onClick={() => handleDeleteImage(image.productImageId)}
                style={ButtonStyles.RED}
                className="absolute top-2 right-2"
            >
                Delete
            </Button>
        </div>
    );
};

export default AdminProductImageCard;