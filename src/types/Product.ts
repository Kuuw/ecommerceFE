import { ProductStock } from './ProductStock';
import { ProductImage } from './ProductImage';

export type Product = {
    productId?: number | null;
    name: string;
    description?: string | null;
    categoryId: number;
    unitPrice: number;
    productStock?: ProductStock | null;
    productImages?: ProductImage[] | null;
}
