export interface UserModel {
    userId?: number | null;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role?: string | null;
    telephone?: string | null;
}