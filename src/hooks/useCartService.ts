import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';
import { CartItem } from '../types/CartItem';
import { Cart } from '../types/Cart';
import { AxiosData } from '../types/AxiosData';

export default class CartService {
    private api_token: string | undefined;
    private client: AxiosInstance | null;
    private api_url: string | undefined;

    constructor() {
        this.api_token = undefined;
        this.client = null;
        this.api_url = import.meta.env.VITE_REACT_APP_API_ENDPOINT + "/Cart";
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

    get = (): Promise<AxiosData<Cart>> => {
        return this.init().get(``, {});
    };

    delete = (productId: number): Promise<AxiosData<any>> => {
        return this.init().delete(`/${productId}`);
    };

    put = (model: CartItem): Promise<AxiosData<any>> => {
        return this.init().put(``, model);
    };
}
