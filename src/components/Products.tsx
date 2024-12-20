import React, { useEffect, useState } from "react";
import ProductCard from "./card/ProductCard";
import Filters from "./Filters";
import useProductService from "../hooks/useProductService";
import { Product } from "../types/Product";
import { ProductFilter } from "../types/ProductFilter";
import axios from "axios";
import useCartService from "../hooks/useCartService";
import toast, { Toaster } from 'react-hot-toast';
import Cookies from "js-cookie";

const Products: React.FC = () => {
    const productService = new useProductService();
    const { getPaged } = productService;

    const cartService = new useCartService();

    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState<string | null>("");
    const [minPrice, setMinPrice] = useState<number | null>(null);
    const [maxPrice, setMaxPrice] = useState<number | null>(null);
    const [category, setCategory] = useState<number | null>(null);

    const loggedIn = Cookies.get('token') != null;

    useEffect(() => {
        fetchProducts();
    }, [currentPage, pageSize, search, minPrice, maxPrice, category]);

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

    const addToCart = (product: Product) => {
        if (!loggedIn) {
            toast.error('You must be logged in to add products to cart');
            return;
        }
        if (product.productId != null) {
            cartService.put({
                productId: product.productId, quantity: 1,
                product: undefined
            });
            toast.success('Product added to cart');
        } else {
            console.error('Product ID is null or undefined');
        }
    };

    const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPageSize(parseInt(e.currentTarget.value));
        setCurrentPage(1);
    };

    return (
        <div>
            <Toaster />
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
            <div className="flex flex-wrap justify-center">
                {products.map(product => (
                    <ProductCard key={product.productId?.toString()} product={product} onAddToCart={() => addToCart({ ...product })} />))}
            </div>
            <div className='paging-container'>
                <button onClick={handlePreviousPage} disabled={currentPage === 1} className='paging-button text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'>
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages} className='paging-button text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'>
                    Next
                </button>
            </div>
            <div className="flex justify-center mt-4">
                <span className="mr-2 font-medium text-lg">Page Size:</span>
                <select className="form-select block" onChange={handlePageSizeChange} value={pageSize}>
                    <option value="5">5</option>
                    <option value="10" selected>10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
            </div>
        </div>
    );
};

export default Products;