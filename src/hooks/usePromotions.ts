import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../services/api-client';

export interface Promotion {
    id: string;
    code: string;
    description: string;
    discountType: 'PERCENTAGE' | 'FIXED_AMOUNT';
    discountValue: number;
    startDate: string | null;
    endDate: string | null;
    usageLimit: number | null;
    usedCount: number;
    status: string;
}

interface PromotionsResponse {
    message: string;
    data: Promotion[];
}

export const usePromotions = () => {
    return useQuery({
        queryKey: ['promotions', 'public'],
        queryFn: async () => {
            // apiClient interceptor already returns response.data
            const response = await apiClient.get<any, PromotionsResponse>('/promotions/public');
            return response.data;
        },
    });
};
