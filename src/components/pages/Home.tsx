import React, { useEffect, useState } from "react";
import ProductCard from "../molecules/ProductCard";
import Filters from "../organisms/Filters";
import useProductService from "../../services/ProductService";
import { Product } from "../../types/Product";
import { ProductFilter } from "../../types/ProductFilter";
import axios from "axios";
import useCartService from "../../services/CartService";
import toast from 'react-hot-toast';
import Cookies from "js-cookie";
import PagingController from "../molecules/PagingController";
import SelectField from "../molecules/SelectField";

const Home: React.FC = () => {
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
        <div className="px-10 mt-2 bg-slate-950">
            <Filters
                search={search}
                setSearch={setSearch}
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                category={category}
                setCategory={setCategory}
                applyFilter={fetchProducts}
            />
            <div className="flex flex-wrap justify-center">
                {products.map(product => (
                    <ProductCard key={product.productId?.toString()} product={product} onAddToCart={() => addToCart({ ...product })} />))}
            </div>
            <PagingController currentPage={currentPage} totalPages={totalPages} handlePreviousPage={handlePreviousPage} handleNextPage={handleNextPage} />
            <SelectField
                label="Page Size:"
                value={pageSize.toString()}
                onChange={handlePageSizeChange}
                options={[
                    { value: '5', label: '5' },
                    { value: '10', label: '10' },
                    { value: '15', label: '15' },
                    { value: '20', label: '20' }
                ]}
            />
        </div>
    );
};

export default Home;