import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';
import { UserLogin } from '../types/UserLogin';
import { UserModel } from '../types/UserModel';
import { AuthenticateResponse } from '../types/AuthenticateResponse';

export default class UserService {
    private api_token: string | undefined;
    private client: AxiosInstance | null;
    private api_url: string | undefined;

    constructor() {
        this.api_token = undefined;
        this.client = null;
        this.api_url = process.env.REACT_APP_API_ENDPOINT + "/User";
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

    login = (login: UserLogin): Promise<AuthenticateResponse | undefined> => {
        return this.init().post("/Login", { body: { login } });
    };

    register = (model: UserModel): Promise<any> => {
        return this.init().post("/Register", { body: { model } });
    };

    get = (userId: number): Promise<UserModel> => {
        return this.init().post("", { userId });
    };

    put = (model: UserModel): Promise<any> => {
        return this.init().put("", { body: { model } });
    };
}
