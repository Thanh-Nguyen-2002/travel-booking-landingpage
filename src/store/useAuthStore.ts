import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, LoginResponse } from '../types/auth';

interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    login: (data: LoginResponse) => void;
    logout: () => void;
    updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            login: (data) => {
                localStorage.setItem('token', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);
                set({ user: data.user, accessToken: data.accessToken, refreshToken: data.refreshToken, isAuthenticated: true });
            },
            logout: () => {
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
                set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false });
            },
            updateUser: (updatedData) => 
                set((state) => ({ 
                    user: state.user ? { ...state.user, ...updatedData } : null 
                })),
        }),
        {
            name: 'auth-storage',
        }
    )
);
