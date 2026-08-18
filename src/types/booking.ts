export interface BookingRoomResponse {
    id: string;
    roomId: string;
    hotelId?: string;
    roomName: string;
    quantity: number;
    price: number;
}

export interface BookingResponse {
    id: string;
    userId: string;
    promotionId?: string;
    promotionCode?: string;
    packageId?: string;
    packageName?: string;
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    status: string;
    subtotal: number;
    discountAmount: number;
    total: number;
    note?: string;
    rooms: BookingRoomResponse[];
    createdAt: string;
    updatedAt: string;
}

export interface BookingItemRequest {
    roomId: string;
    quantity: number;
}

export interface BookingCreationRequest {
    checkIn: string;
    checkOut: string;
    customerName: string;
    customerPhone: string;
    customerEmail?: string;
    promotionCode?: string;
    packageId?: string;
    guests: number;
    items?: BookingItemRequest[];
    note?: string;
}
