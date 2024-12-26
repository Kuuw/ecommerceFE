import React, { useEffect, useState, useCallback } from "react";
import { debounce } from "lodash";
import useCategoryService from "../../services/CategoryService";
import { Category } from "../../types/Category";
import IProductFilter from "../../types/props/IProductFilter";
import FormField from "../molecules/FormField";
import Select from "../atoms/Select";
import ButtonStyles from "../../styles/ButtonStyles";
import Button from "../atoms/Button";
import Label from "../atoms/Label";

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

    const categoryOptions = [{ value: undefined, label: "All" }, ...categories.map((category) => ({ value: category.categoryId?.toString()!, label: category.name }))];

    const debouncedApplyFilter = useCallback(debounce(() => {
        props.applyFilter();
    }, 300), [props.applyFilter]);

    useEffect(() => {
        debouncedApplyFilter();
        return debouncedApplyFilter.cancel;
    }, [props.search, props.minPrice, props.maxPrice, props.category, debouncedApplyFilter]);

    return (
        <div className="flex justify-center">
            <div className="flex flex-wrap gap-6 mb-6 md:grid-cols-2">
                {/* Search box */}
                <FormField label={"Search"} type={"text"} name={"Search"} value={props.search ?? ""} onChange={(e) => {
                    props.setSearch(e.target.value);
                    debouncedApplyFilter();
                }} />
                {/* Price range */}
                <FormField label="Minimum Price" type="text" name="Minimum Price" value={props.minPrice?.toString() ?? ""} onChange={(e) => {
                    props.setMinPrice(Number(e.target.value));
                    debouncedApplyFilter();
                }} />
                <FormField label="Maximum Price" type="text" name="Maximum Price" value={props.maxPrice?.toString() ?? ""} onChange={(e) => {
                    props.setMaxPrice(Number(e.target.value));
                    debouncedApplyFilter();
                }} />
                {/* Category filter */}
                <div>
                    <Label className="block text-sm font-medium text-gray-700 mt-2 mb-1" text="Category" />
                    <Select
                        className=""
                        value={props.category?.toString() ?? ""}
                        onChange={(e) => {
                            props.setCategory(Number(e.target.value));
                            debouncedApplyFilter();
                        }}
                        options={categoryOptions}
                    />
                </div>
                {/* Apply button */}
                <div className="content-end align-bottom mt-7">
                    <Button className="mr-2" style={ButtonStyles.GRAY} onClick={() => props.applyFilter()}>Apply</Button>
                    <Button className="" style={ButtonStyles.GRAY} onClick={() => resetFilters()}>Clear</Button>
                </div>
            </div>
        </div>
    );
};

export default Filters;