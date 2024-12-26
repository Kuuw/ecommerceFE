import { Product } from "./Product";

export type OrderItem = {
    productId: number;
    quantity: number;
    unitPrice: number;
    product: Product;
}