import { Dispatch, SetStateAction } from "react";

interface IProductFilter {
    category: number | null;
    setCategory: Dispatch<SetStateAction<number | null>>;
    maxPrice: number | null;
    setMaxPrice: Dispatch<SetStateAction<number | null>>;
    minPrice: number | null;
    setMinPrice: Dispatch<SetStateAction<number | null>>;
    search: string | null;
    setSearch: Dispatch<SetStateAction<string | null>>;
    applyFilter: () => void;
}

export default IProductFilter;