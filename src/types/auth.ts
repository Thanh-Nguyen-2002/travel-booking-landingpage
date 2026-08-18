export interface User {
    id: string;
    username: string;
    fullName: string;
    email: string;
    phone?: string;
    avatar?: string;
    role: string;
    isActive?: boolean;
    status?: string;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    user: User;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
    fullName: string;
    phone?: string;
}
