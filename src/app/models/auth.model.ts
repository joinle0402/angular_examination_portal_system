export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    access_token: string;
    user: UserPrincipal;
}

export interface RegisterRequest {
    fullname: string;
    username: string;
    password: string;
    roles: string[];
}

export interface UserPrincipal {
    fullname: string;
    username: string;
    avatar: string;
    roles: string[];
}

export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN',
}
