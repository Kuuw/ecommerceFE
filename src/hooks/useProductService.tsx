import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';
import { Product } from '../types/Product';
import { ProductPagedResponse } from '../types/ProductPagedResponse';
import { ProductFilter } from '../types/ProductFilter';

export default class ProductService {
    private api_token: string | undefined;
    private client: AxiosInstance | null;
    private api_url: string | undefined;

    constructor() {
        this.api_token = undefined;
        this.client = null;
        this.api_url = process.env.REACT_APP_API_ENDPOINT + "/Product";
    }

    init = (): AxiosInstance => {
        this.api_token = Cookies.get('ACCESS_TOKEN');

        let headers: Record<string, string> = {
            Accept: "application/json",
        };

        if (this.api_token) {
            headers.Authorization = `Bearer ${this.api_token}`;
        }

        this.client = axios.create({
            baseURL: this.api_url,
            timeout: 31000,
            headers: headers,
        });

        return this.client;
    };

    getPaged = (page: number, pageSize: number, filters: ProductFilter | null): Promise<ProductPagedResponse> => {
        return this.init().get(`/GetPaged`, {
            params: {
                page,
                pageSize,
                filters
            }
        });
    };

    getById = (productId: number): Promise<Product> => {
        return this.init().get(`/${productId}`, {});
    };

    post = (model: Product): Promise<any> => {
        return this.init().post(``, { body: { model } });
    };

    delete = (productId: number): Promise<any> => {
        return this.init().delete(`/${productId}`);
    };

    put = (productId: number, model: Product): Promise<any> => {
        return this.init().put(`/${productId}`, { body: { model } });
    };

    updateStock = (productId: number, stock: number): Promise<any> => {
        return this.init().put(`/${productId}`, { params: { stock } });
    };

    addImage = (productId: number, file: File): Promise<any> => {
        const formData = new FormData();
        formData.append('file', file);

        return this.init().post(`/Image/${productId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
                'Authorization': `Bearer ${this.api_token}`
            }
        });
    };

    deleteImage = (imageGuid: string): Promise<any> => {
        return this.init().delete(`/Image/${imageGuid}`);
    };
}
