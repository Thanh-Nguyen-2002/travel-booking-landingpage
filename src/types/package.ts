import type { DestinationResponse } from './destination';

export interface PackageResponse {
    id: string;
    name: string;
    slug: string;
    destination: DestinationResponse;
    duration: string;
    price: number;
    promotionalPrice?: number;
    description?: string;
    includes?: string;
    excludes?: string;
    itinerary?: string;
    images?: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}
