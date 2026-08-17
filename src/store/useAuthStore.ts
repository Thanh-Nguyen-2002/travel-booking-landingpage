import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, LoginResponse } from '../types/auth';

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (data: LoginResponse) => void;
    logout: () => void;
    updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            login: (data) => {
                localStorage.setItem('token', data.token);
                set({ user: data.user, token: data.token, isAuthenticated: true });
            },
            logout: () => {
                localStorage.removeItem('token');
                set({ user: null, token: null, isAuthenticated: false });
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
