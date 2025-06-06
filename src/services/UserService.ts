import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';
import { UserModel } from '../types/UserModel';
import { AuthenticateResponse } from '../types/AuthenticateResponse';
import { AxiosData } from '../types/AxiosData';

export default class UserService {
    private api_token: string | undefined;
    private client: AxiosInstance | null;
    private api_url: string | undefined;

    constructor() {
        this.api_token = undefined;
        this.client = null;
        this.api_url = import.meta.env.VITE_REACT_APP_API_ENDPOINT + "/User";
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

    login = (email: string, password: string): Promise<AxiosData<AuthenticateResponse>> => {
        return this.init().post("/Login", { email, password });
    };

    register = (firstName: string, lastName: string, email: string, password: string): Promise<AxiosData<any>> => {
        return this.init().post("/Register", { firstName, lastName, email, password });
    };

    get = (): Promise<AxiosData<UserModel>> => {
        return this.init().get("", {});
    };

    put = (model: UserModel): Promise<AxiosData<any>> => {
        return this.init().put("", { model });
    };
}
