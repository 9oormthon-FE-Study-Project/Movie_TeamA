import { create } from 'zustand';
import { ReviewData, ReviewDataWithLikes } from '../types/review';

interface ReviewStore {
  reviews: ReviewDataWithLikes[];
  addReview: (data: ReviewData) => void;
  increaseLike: (index: number) => void;
}

const useReviewStore = create<ReviewStore>((set) => ({
  reviews: [],

  addReview: (data) =>
    set((state) => ({
      reviews: [
        { content: data.content, rating: data.rating, likes: 0 },
        ...state.reviews,
      ],
    })),

  increaseLike: (index) =>
    set((state) => ({
      reviews: state.reviews.map((r, idx) =>
        idx === index ? { ...r, likes: r.likes + 1 } : r
      ),
    })),
}));

export { useReviewStore };
