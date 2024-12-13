import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';
import { Order } from '../types/Order';

export interface Orders {
    results: Order[];
}

export default class OrderService {
    private api_token: string | undefined;
    private client: AxiosInstance | null;
    private api_url: string | undefined;

    constructor() {
        this.api_token = undefined;
        this.client = null;
        this.api_url = import.meta.env.VITE_REACT_APP_API_ENDPOINT + "/Order";
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

    get = (): Promise<Orders> => {
        return this.init().get(``, {});
    };

    getById = (orderId: number): Promise<Order> => {
        return this.init().get(`/${orderId}`, {});
    };

    post = (model: Order): Promise<any> => {
        return this.init().post(``, { body: { model } });
    };
}
