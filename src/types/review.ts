export interface Review {
  user: string;
  comment: string;
  likes: number;
}

export interface ReviewData {
  content: string;
  rating: number;
}

export interface ReviewDataWithLikes extends ReviewData {
  likes: number;
}

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
