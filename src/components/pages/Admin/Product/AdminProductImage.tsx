import React, { useEffect, useState } from 'react';
import ProductService from '../../../../services/ProductService';
import Button from '../../../../components/atoms/Button';
import ButtonStyles from '../../../../styles/ButtonStyles';
import { ProductImage } from '../../../../types/ProductImage';
import { useParams } from 'react-router-dom';
import AdminProductImageCard from '../../../organisms/AdminProductImageCard';
import Input from '../../../atoms/Input';

const AdminProductImage: React.FC = () => {
    const [images, setImages] = useState<ProductImage[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const productService = new ProductService();
    const { productId } = useParams();

    useEffect(() => {
        fetchImages();
    }, [productId]);

    const fetchImages = () => {
        productService.getById(Number(productId))
            .then(response => {
                setImages(response.data.productImages || []);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleAddImage = () => {
        if (selectedFile) {
            productService.addImage(Number(productId), selectedFile)
                .then(() => {
                    fetchImages();
                })
                .catch(error => {
                    console.error(error);
                });
        }
    };

    const handleDeleteImage = (imageGuid: string) => {
        productService.deleteImage(imageGuid)
            .then(() => {
                fetchImages();
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div className="p-5 flex flex-col items-center">
            <Button onClick={() => window.history.back()} style={ButtonStyles.BLUE} className="mb-4"> Back </Button>
            <h2 className='dark:text-white text-black'>Manage Product Images</h2>
            <Input type="file" value="" onChange={handleFileChange} className='my-2' />
            <Button onClick={handleAddImage} style={ButtonStyles.BLUE} disabled={!selectedFile}>
                Add Image
            </Button>
            <div className="grid grid-cols-3 gap-4 mt-4">
                {images.map(image => (
                    <AdminProductImageCard key={image.productImageId} image={image} handleDeleteImage={handleDeleteImage} />
                ))}
            </div>
        </div>
    );
};

export default AdminProductImage;