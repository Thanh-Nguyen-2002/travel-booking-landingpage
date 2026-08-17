import type { AmenityResponse } from './amenity';

export interface RoomResponse {
    id: string;
    hotelId: string;
    name: string;
    slug: string;
    description: string;
    size: string;
    capacity: number;
    bedType: string;
    view: string;
    price: number;
    quantity: number;
    images: string;
    status: string;
    amenities: AmenityResponse[];
}
