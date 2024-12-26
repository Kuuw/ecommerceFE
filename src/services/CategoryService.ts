import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';
import { Category } from '../types/Category';
import { AxiosData } from '../types/AxiosData';


export default class CategoryService {
    private api_token: string | undefined;
    private client: AxiosInstance | null;
    private api_url: string | undefined;

    constructor() {
        this.api_token = undefined;
        this.client = null;
        this.api_url = import.meta.env.VITE_REACT_APP_API_ENDPOINT + "/Category";
    }

    init = (): AxiosInstance => {
        this.api_token = Cookies.get('token');

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

    get = (): Promise<AxiosData<Category[]>> => {
        return this.init().get(``, {});
    };

    getById = (categoryId: number): Promise<AxiosData<Category>> => {
        return this.init().get(`/${categoryId}`, {});
    };

    post = (model: Category): Promise<AxiosData<any>> => {
        return this.init().post(``, model);
    };

    delete = (categoryId: number): Promise<AxiosData<any>> => {
        return this.init().delete(`/${categoryId}`);
    };

    put = (categoryId: number, model: Category): Promise<AxiosData<any>> => {
        return this.init().put(`/${categoryId}`, model);
    };
}
