import { create } from 'zustand';
import { ReviewData, ReviewDataWithLikes } from '../types/review';

interface ReviewStore {
  reviews: ReviewDataWithLikes[];
  addReview: (data: ReviewData) => void;
  addReviews: (data: ReviewDataWithLikes[]) => void;
  increaseLike: (movieId: string, indexInFiltered: number) => void;
}

const useReviewStore = create<ReviewStore>((set) => ({
  reviews: [],

  addReview: (data) =>
    set((state) => ({
      reviews: [{ ...data, likes: 0 }, ...state.reviews],
    })),

  addReviews: (dataArray) =>
    set((state) => ({
      reviews: [...dataArray, ...state.reviews],
    })),

  increaseLike: (movieId, indexInFiltered) =>
    set((state) => {
      const filteredReviews = state.reviews.filter(
        (r) => r.movieId === movieId
      );

      const targetReview = filteredReviews[indexInFiltered];
      const globalIndex = state.reviews.findIndex(
        (r) =>
          r.content === targetReview.content &&
          r.rating === targetReview.rating &&
          r.likes === targetReview.likes &&
          r.movieId === movieId
      );

      if (globalIndex === -1) return state;

      const updatedReviews = [...state.reviews];
      updatedReviews[globalIndex] = {
        ...updatedReviews[globalIndex],
        likes: updatedReviews[globalIndex].likes + 1,
      };

      return { reviews: updatedReviews };
    }),
}));

export { useReviewStore };
