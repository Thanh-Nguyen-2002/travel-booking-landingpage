import { useMutation } from '@tanstack/react-query';
import { userService, type ChangePasswordRequest } from '../services/user.service';

export const useChangePassword = () => {
    return useMutation({
        mutationFn: (request: ChangePasswordRequest) => userService.changePassword(request)
    });
};
