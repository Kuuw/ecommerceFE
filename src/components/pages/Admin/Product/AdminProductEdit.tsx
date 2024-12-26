import React, { useEffect, useState } from 'react';
import ProductForm from '../../../organisms/ProductForm';
import { Product } from '../../../../types/Product';
import ProductService from '../../../../services/ProductService';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../../atoms/Button';
import ButtonStyles from '../../../../styles/ButtonStyles';

const AdminProductEdit: React.FC = () => {
    const [product, setProduct] = useState<Product>({
        productId: null,
        name: '',
        description: '',
        categoryId: 0,
        unitPrice: 0,
        productStock: null,
        productImages: null,
    });
    const { productId } = useParams();
    const productService = new ProductService();
    const navigate = useNavigate();

    useEffect(() => {
        if (productId) {
            productService.getById(Number(productId))
                .then(response => {
                    setProduct(response.data);
                })
                .catch(error => {
                    console.error('Error fetching product:', error);
                });
        }
    }, [productId]);

    const handleSubmit = async () => {
        await productService.put(Number(productId), product)
            .then(() => {
                setProduct({
                    productId: null,
                    name: '',
                    description: '',
                    categoryId: 0,
                    unitPrice: 0,
                    productStock: null,
                    productImages: null,
                });
                navigate('/admin/product');
            })
            .catch(error => console.error('Error updating product:', error));
    };

    return (
        <div className='p-5'>
            <Button onClick={() => navigate('/admin/product')} className='m-3 h-10' style={ButtonStyles.BLUE}>
                Back to Products
            </Button>
            <div className='p-5 flex justify-center mt-5'>
                <ProductForm
                    product={product}
                    setProduct={setProduct}
                    onSubmit={handleSubmit}
                    formTitle="Edit Product"
                />
            </div>
        </div>
    );
};

export default AdminProductEdit;