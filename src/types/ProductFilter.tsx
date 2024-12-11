export interface ProductFilter {
    productName?: string | null;
    categoryId?: number | null;
    minPrice?: number | null;
    maxPrice?: number | null;
}