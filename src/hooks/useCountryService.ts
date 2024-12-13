import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';
import { Country } from '../types/Country';

export interface Countries {
    results: Country[];
}

export default class CountryService {
    private api_token: string | undefined;
    private client: AxiosInstance | null;
    private api_url: string | undefined;

    constructor() {
        this.api_token = undefined;
        this.client = null;
        this.api_url = import.meta.env.VITE_REACT_APP_API_ENDPOINT + "/Country";
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

    get = (): Promise<Countries> => {
        return this.init().get(``, {});
    };

    getById = (categoryId: number): Promise<Country> => {
        return this.init().get(`/${categoryId}`, {});
    };

    post = (model: Country): Promise<any> => {
        return this.init().post(``, { body: { model } });
    };

    delete = (countryId: number): Promise<any> => {
        return this.init().delete(`/${countryId}`);
    };

    put = (countryId: number, model: Country): Promise<any> => {
        return this.init().put(`/${countryId}`, { body: { model } });
    };
}
