export interface Review {
  user: string;
  comment: string;
  likes: number;
}

export interface ReviewData {
  content: string;
  rating: number;
  movieId: string;
}

export interface ReviewDataWithLikes extends ReviewData {
  likes: number;
  username: string;
}

export interface AllReviewProps {
  content: string;
  rating: number;
  likes: number;
  username: string;
  onLike: () => void;
}

export interface WriteReviewProps {
  onSubmitReview: (data: {
    content: string;
    rating: number;
    movieId: number;
  }) => void;
  movieId: string;
}

export interface BestReviewSlideProps {
  reviews: ReviewDataWithLikes[];
  onLike?: (index: number) => void;
}

export interface StarAverageProps {
  movieId?: string;
}

export interface PlotProps {
  movieId?: string;
}

export interface PosterProps {
  movieId: string;
}
