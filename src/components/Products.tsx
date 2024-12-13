import React, { useState, useEffect } from 'react';
import useProductService from '../hooks/useProductService';
import { Product } from '../types/Product';
import axios from 'axios';
import ProductCard from './card/ProductCard';

const Products: React.FC = () => {
    const productService = new useProductService();
    const filters = {};
    const { getPaged } = productService;
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(12);

    const fetchProducts = async () => {
        try {
            const response = await getPaged(currentPage, pageSize, filters);
            console.log('API Response:', response);
            if (response.status !== 200) {
                console.error('API Error:', response.data);
                return;
            }
            setProducts(response.data.items);
            setTotalPages(response.data.metadata.totalPages);
            setPageSize(response.data.metadata.pageSize);
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

    return (
        <div>
            <div className="flex flex-wrap">
                {products.map(product => (
                    <ProductCard product={product} />
                ))}
            </div>
            <div className='paging-container'>
                <button onClick={handlePreviousPage} disabled={currentPage === 1} className='paging-button'>
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages} className='paging-button'>
                    Next
                </button>
            </div>
        </div>
    );
};

export default Products;