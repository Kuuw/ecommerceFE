import { JwtPayload } from 'jwt-decode';

export type JwtPayloadExtend = JwtPayload & {
    role: string;
    Email: string;
    UserId: number;
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
    FirstName: string;
    LastName: string;
}