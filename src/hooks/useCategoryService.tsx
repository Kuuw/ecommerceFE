import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';
import { Category } from '../types/Category';

export interface Categories {
    results: Category[];
}

export default class CategoryService {
    private api_token: string | undefined;
    private client: AxiosInstance | null;
    private api_url: string | undefined;

    constructor() {
        this.api_token = undefined;
        this.client = null;
        this.api_url = process.env.REACT_APP_API_ENDPOINT + "/Category";
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

    get = (): Promise<Categories> => {
        return this.init().get(``, {});
    };

    getById = (categoryId: number): Promise<Category> => {
        return this.init().get(`/${categoryId}`, {});
    };

    post = (model: Category): Promise<any> => {
        return this.init().post(``, { body: { model } });
    };

    delete = (categoryId: number): Promise<any> => {
        return this.init().delete(`/${categoryId}`);
    };

    put = (categoryId: number, model: Category): Promise<any> => {
        return this.init().put(`/${categoryId}`, { body: { model } });
    };
}
