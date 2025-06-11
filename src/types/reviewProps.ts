import { ReviewData, ReviewDataWithLikes } from './review';

export interface AllReviewProps {
  content: string;
  rating: number;
  likes: number;
  onLike: () => void;
}

export interface WriteReviewProps {
  onSubmitReview: (data: ReviewData) => void;
}

export interface BestReviewSlideProps {
  reviews: ReviewDataWithLikes[];
  onLike?: (index: number) => void;
}
