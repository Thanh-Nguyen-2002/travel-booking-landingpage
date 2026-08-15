export interface ApiResponse<T> {
    code: number;
    message: string;
    data: T;
}

export interface SettingsMap {
    siteName?: string;
    logoUrl?: string;
    contactEmail?: string;
    hotline?: string;
    facebookUrl?: string;
    address?: string;
    [key: string]: string | undefined;
}
