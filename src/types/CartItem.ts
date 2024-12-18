import { Product } from "./Product";

export type CartItem = {
    productId: number;
    quantity: number;
    product: Product | undefined;
}