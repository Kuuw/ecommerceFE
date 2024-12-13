import { Product } from './Product';
import { PageMetadata } from './PageMetadata';

export type ProductPagedResponse = {
    items: Product[];
    metadata: PageMetadata;
}