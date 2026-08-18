import { useMutation } from '@tanstack/react-query';
import { reviewService, type ReviewCreationRequest } from '../services/review.service';

export const useCreateReview = () => {
    return useMutation({
        mutationFn: (request: ReviewCreationRequest) => reviewService.createReview(request)
    });
};
