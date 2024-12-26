import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../atoms/Button';
import ButtonStyles from '../../../../styles/ButtonStyles';
import { Product } from '../../../../types/Product';
import ProductService from '../../../../services/ProductService';
import ProductTable from '../../../organisms/ProductTable';
import PagingController from '../../../molecules/PagingController';

const AdminProduct: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const productService = new ProductService();
    const navigate = useNavigate();
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [totalPages, setTotalPages] = useState<number>(0);

    useEffect(() => {
        productService.getPaged(page, pageSize, {}).then(response => {
            setProducts(response.data.items);
            setTotalPages(response.data.metadata.totalPages);
            setLoading(false);
        }).catch(error => {
            console.error('Error fetching products:', error);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleNextPage = () => {
        if (page >= totalPages) {
            return;
        }
        setPage(page + 1);
        productService.getPaged(page + 1, pageSize, {}).then(response => {
            setProducts(response.data.items);
        }).catch(error => {
            console.error('Error fetching products:', error);
        });
    }

    const handlePreviousPage = () => {
        if (page <= 1) {
            return;
        }
        setPage(page - 1);
        productService.getPaged(page - 1, pageSize, {}).then(response => {
            setProducts(response.data.items);
        }).catch(error => {
            console.error('Error fetching products:', error);
        });
    }

    const deleteProduct = (productId: number) => {
        productService.delete(productId).then(response => {
            setProducts(products.filter(product => product.productId !== productId));
        }).catch(error => {
            console.error('Error deleting product:', error);
        });
    };

    return (
        <div className='p-5'>
            <Button onClick={() => navigate('/admin')} className='m-3 h-10' style={ButtonStyles.BLUE}>
                Back to admin menu
            </Button>
            <div className='p-5'>
                <h1 className='font-bold text-lg'>Admin Products</h1>
                <Button onClick={() => navigate('/admin/product/add')} className='m-3 h-10' style={ButtonStyles.GREEN}>
                    Add Product
                </Button>
                <ProductTable products={{ products }} deleteProduct={deleteProduct} />
            </div>
            <PagingController currentPage={page} totalPages={totalPages} handleNextPage={handleNextPage} handlePreviousPage={handlePreviousPage} />
        </div>
    );
};

export default AdminProduct;