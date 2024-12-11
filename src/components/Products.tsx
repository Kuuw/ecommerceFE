import React, { useState, useEffect } from 'react';
import useProductService from '../hooks/useProductService';
import { Product } from '../types/Product';
import axios from 'axios';
import { ProductFilter } from '../types/ProductFilter';

const Products: React.FC = () => {
    const productService = new useProductService();
    const filters = {};
    const { getPaged } = productService;
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);

    const fetchProducts = async () => {
        try {
            const response = await getPaged(currentPage, pageSize, filters);
            console.log('API Response:', response);
            setProducts(response.items);
            setTotalPages(response.metadata.totalPages);
            setPageSize(response.metadata.pageSize);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Axios error:', error.message);
                if (error.response) {
                    console.error('Response data:', error.response.data);
                    console.error('Response status:', error.response.status);
                }
            } else {
                console.error('Unexpected error:', error);
            }
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [currentPage]);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleReload = () => {
        fetchProducts();
    };

    return (
        <div>
            <h1>Products</h1>
            <button onClick={handleReload}>Reload</button>
            <ul>
                {products.map(product => (
                    <li key={product.productId}>{product.name}</li>
                ))}
            </ul>
            <div>
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default Products;