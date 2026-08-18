import { create } from 'zustand';

interface BookingInfo {
    hotelId?: string;
    hotelName?: string;
    roomId?: string;
    roomName?: string;
    packageId?: string;
    packageName?: string;
    type?: 'room' | 'package';
    price: number;
    checkIn?: string;
    checkOut?: string;
    guests?: number;
    coverImage?: string;
}

interface BookingState {
    bookingInfo: BookingInfo | null;
    setBookingInfo: (info: BookingInfo) => void;
    clearBookingInfo: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
    bookingInfo: null,
    setBookingInfo: (info) => set({ bookingInfo: info }),
    clearBookingInfo: () => set({ bookingInfo: null }),
}));
