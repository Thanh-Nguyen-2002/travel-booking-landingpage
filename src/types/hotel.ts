import type { AmenityResponse } from './amenity';

export interface HotelResponse {
    id: string;
    name: string;
    slug: string;
    description: string;
    address: string;
    latitude: number;
    longitude: number;
    rating: number;
    priceFrom: number;
    images: string;
    status: string;
    amenities: AmenityResponse[];
}
