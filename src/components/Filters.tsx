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

    return (
        <div>
            <div className="flex flex-wrap">
                {/* Search box */}
                <input
                    type="text"
                    placeholder="Search"
                    value={props.search ?? ""}
                    onChange={(e) => props.setSearch && props.setSearch(e.target.value)}
                />
                {/* Price range */}
                <input
                    type="number"
                    placeholder="Min price"
                    value={props.minPrice ?? ""}
                    onChange={(e) => props.setMinPrice && props.setMinPrice(Number(e.target.value))}
                />
                <input
                    type="number"
                    placeholder="Max price"
                    value={props.maxPrice ?? ""}
                    onChange={(e) => props.setMaxPrice && props.setMaxPrice(Number(e.target.value))}
                />
                {/* Category filter */}
                {categories.map((category) => (
                    <div key={category.categoryId?.toString()}>
                        <input
                            type="radio"
                            name="category"
                            value={category.categoryId?.toString()}
                            onChange={(e) => props.setCategory && props.setCategory(Number(e.target.value))}
                        />
                        <label htmlFor="category">{category.name}</label>
                    </div>
                ))}
                {/* Apply button */}
                <button onClick={() => props.applyFilter}>Apply</button>
            </div>
        </div>
    );
};

export default Filters;