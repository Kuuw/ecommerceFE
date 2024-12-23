import React, { useEffect, useState } from "react";
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

    return (
        <div className="flex justify-center">
            <div className="flex flex-wrap gap-6 mb-6 md:grid-cols-2">
                {/* Search box */}
                <FormField label={"Search"} type={"text"} name={"Search"} value={""} onChange={(e) => props.setSearch && props.setSearch(e.target.value)} />
                {/* Price range */}
                <FormField label="Minimum Price" type="text" name="Minimum Price" value="" onChange={(e) => props.setMinPrice && props.setMinPrice(Number(e.target.value))} />
                <FormField label="Maximum Price" type="text" name="Maximum Price" value="" onChange={(e) => props.setMaxPrice && props.setMaxPrice(Number(e.target.value))} />
                {/* Category filter */}
                <div>
                    <Label className="block text-sm font-medium text-gray-700 mt-2 mb-1" text="Category" />
                    <Select
                        className=""
                        value={props.category?.toString()!}
                        onChange={(e) => props.setCategory && props.setCategory(Number(e.target.value))}
                        options={categoryOptions}
                    />
                </div>
                {/* Apply button */}
                <div className="content-end">
                    <Button className="mr-2" style={ButtonStyles.GRAY} onClick={() => props.applyFilter()}>Apply</Button>
                    <Button className="" style={ButtonStyles.GRAY} onClick={() => resetFilters()}>Clear</Button>
                </div>
            </div>
        </div>
    );
};

export default Filters;