import React, { useState } from 'react';
import ProductForm from '../../../organisms/ProductForm';
import { Product } from '../../../../types/Product';
import ProductService from '../../../../services/ProductService';
import { useNavigate } from 'react-router-dom';

const AdminProductAdd: React.FC = () => {
    const [product, setProduct] = useState<Product>({
        name: '',
        description: '',
        categoryId: 0,
        unitPrice: 0,
        productStock: null,
        productImages: null,
    });
    const productService = new ProductService();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        await productService.post(product)
            .then(() => {
                setProduct({
                    name: '',
                    description: '',
                    categoryId: 0,
                    unitPrice: 0,
                    productStock: null,
                    productImages: null,
                });
                navigate('/admin/product');
            })
            .catch(error => console.error('Error creating product:', error));
    };

    return (
        <div className='p-5 flex justify-center'>
            <ProductForm
                product={product}
                setProduct={setProduct}
                onSubmit={handleSubmit}
                formTitle="Add New Product"
            />
        </div>
    );
};

export default AdminProductAdd;