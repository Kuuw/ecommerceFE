import React, { useEffect, useState } from "react";
import ProductCard from "./card/ProductCard";
import Filters from "./Filters";
import useProductService from "../hooks/useProductService";
import { Product } from "../types/Product";
import { ProductFilter } from "../types/ProductFilter";
import axios from "axios";

const Products: React.FC = () => {
    const productService = new useProductService();
    const { getPaged } = productService;
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState<string | null>("");
    const [minPrice, setMinPrice] = useState<number | null>(null);
    const [maxPrice, setMaxPrice] = useState<number | null>(null);
    const [category, setCategory] = useState<number | null>(null);

    useEffect(() => {
        fetchProducts();
    });

    const fetchProducts = async () => {
        try {
            const filter: ProductFilter = { productName: search, categoryId: category, minPrice: minPrice, maxPrice: maxPrice };

            const response = await getPaged(currentPage, pageSize, filter);
            if (response.status === 200) {
                setProducts(response.data.items);
                setTotalPages(response.data.metadata.totalPages);
            } else {
                console.error('Response status:', response.status);
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.error('Response status:', error.response.status);
            } else {
                console.error('Unexpected error:', error);
            }
        }
    };

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
            <Filters
                search={search}
                setSearch={setSearch}
                minPrice={minPrice ?? null}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice ?? 0}
                setMaxPrice={setMaxPrice}
                category={category}
                setCategory={setCategory}
                applyFilter={fetchProducts}
            />
            <div className="flex flex-wrap">
                {products.map(product => (
                    <ProductCard key={product.productId?.toString()} product={product} />
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