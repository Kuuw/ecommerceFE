import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';
import { Address } from '../types/Address';

export interface Addresses {
    results: Address[];
}

export default class AddressService {
    private api_token: string | undefined;
    private client: AxiosInstance | null;
    private api_url: string | undefined;

    constructor() {
        this.api_token = undefined;
        this.client = null;
        this.api_url = import.meta.env.VITE_REACT_APP_API_ENDPOINT + "/Address";
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

    get = (): Promise<Addresses> => {
        return this.init().get(``, {});
    };

    post = (model: Address): Promise<any> => {
        return this.init().post(``, { model });
    };

    delete = (addressId: number): Promise<any> => {
        return this.init().delete(`/${addressId}`);
    };

    put = (addressId: number, model: Address): Promise<any> => {
        return this.init().put(`/${addressId}`, { model });
    };
}
