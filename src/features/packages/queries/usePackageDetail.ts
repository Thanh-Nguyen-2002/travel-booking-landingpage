import { useQuery } from '@tanstack/react-query';
import apiClient from '../../../services/api-client';
import type { ApiResponse } from '../../../types/common';
import type { PackageResponse } from '../../../types/package';

export const usePackageDetail = (idOrSlug?: string) => {
    return useQuery({
        queryKey: ['package', idOrSlug],
        queryFn: async () => {
            if (!idOrSlug) return null;
            const response = await apiClient.get<any, ApiResponse<PackageResponse>>(`/packages/${idOrSlug}`);
            return response.data;
        },
        enabled: !!idOrSlug
    });
};
