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
    aboutUs?: string;
    termsOfService?: string;
    privacyPolicy?: string;
    [key: string]: string | undefined;
}
