import { useMutation } from '@tanstack/react-query';
import { userService, type UpdateProfileRequest } from '../services/user.service';

export const useUpdateProfile = () => {
    return useMutation({
        mutationFn: (request: UpdateProfileRequest) => userService.updateProfile(request)
    });
};
