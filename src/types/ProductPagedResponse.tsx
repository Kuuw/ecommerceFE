import { Product } from './Product';
import { PageMetadata } from './PageMetadata';

export interface ProductPagedResponse {
    items: Product[];
    metadata: PageMetadata;
}