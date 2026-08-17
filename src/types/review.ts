export interface ReviewResponse {
    id: string;
    userId: string;
    userFullName: string;
    hotelId?: string;
    hotelName?: string;
    roomId?: string;
    roomName?: string;
    rating: number;
    comment: string;
    images?: string;
    status: string; // PENDING, APPROVED, REJECTED
    createdAt: string;
}
