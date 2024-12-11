import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';
import { ShipmentCompany } from '../types/ShipmentCompany';

export interface ShipmentCompanies {
    results: ShipmentCompany[];
}

export default class ShipmentCompanyService {
    private api_token: string | undefined;
    private client: AxiosInstance | null;
    private api_url: string | undefined;

    constructor() {
        this.api_token = undefined;
        this.client = null;
        this.api_url = process.env.REACT_APP_API_ENDPOINT + "/ShipmentCompany";
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

    get = (): Promise<ShipmentCompanies> => {
        return this.init().get(``, {});
    };

    getById = (shipmentCompanyId: number): Promise<ShipmentCompany> => {
        return this.init().get(`/${shipmentCompanyId}`, {});
    };

    post = (model: ShipmentCompany): Promise<any> => {
        return this.init().post(``, { body: { model } });
    };

    delete = (shipmentCompanyId: number): Promise<any> => {
        return this.init().delete(`/${shipmentCompanyId}`);
    };

    put = (shipmentCompanyId: number, model: ShipmentCompany): Promise<any> => {
        return this.init().put(`/${shipmentCompanyId}`, { body: { model } });
    };
}
