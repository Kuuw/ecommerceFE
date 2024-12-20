import React, { useEffect, useState } from "react";
import useCategoryService from "../hooks/useCategoryService";
import { Category } from "../types/Category";
import IProductFilter from "../types/props/IProductFilter";

type Categories = Category[];

const Filters: React.FC<IProductFilter> = (props: IProductFilter) => {
    const categoryService = new useCategoryService();
    const { get } = categoryService;
    const [categories, setCategories] = useState<Categories>([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await get();
            if (response.status !== 200) {
                console.error("API Error:", response.data);
                return;
            }
            setCategories(response.data as unknown as Categories);
        } catch (error) {
            console.error("Unexpected error:", error);
        }
    };

    const resetFilters = () => {
        props.setSearch && props.setSearch("");
        props.setCategory && props.setCategory(null);
        props.setMinPrice && props.setMinPrice(null);
        props.setMaxPrice && props.setMaxPrice(null);
    }

    return (
        <div>
            <div className="flex flex-wrap gap-6 mb-6 md:grid-cols-2">
                {/* Search box */}
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Search</label>
                    <input
                        type="text"
                        placeholder=""
                        value={props.search ?? ""}
                        onChange={(e) => props.setSearch && props.setSearch(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>
                {/* Price range */}
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Minimum Price</label>
                    <input
                        type="number"
                        placeholder=""
                        value={props.minPrice ?? ""}
                        onChange={(e) => props.setMinPrice && props.setMinPrice(Number(e.target.value))}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Maximum Price</label>
                    <input
                        type="number"
                        placeholder="Max price"
                        value={props.maxPrice ?? ""}
                        onChange={(e) => props.setMaxPrice && props.setMaxPrice(Number(e.target.value))}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>
                {/* Category filter */}
                <div className="mt-6">
                    <select
                        id="dropdown"
                        className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-200"
                        onChange={(e) => props.setCategory && props.setCategory(Number(e.target.value))}>
                        <option value={undefined}>All Categories</option>
                        {categories.map((category) => (
                            <option key={category.categoryId?.toString()} value={category.categoryId?.toString()}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                {/* Apply button */}
                <div className="content-end">
                    <button className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" onClick={() => props.applyFilter()}>Apply</button>
                    <button className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" onClick={() => resetFilters()}>Clear</button>
                </div>
            </div>
        </div>
    );
};

export default Filters;