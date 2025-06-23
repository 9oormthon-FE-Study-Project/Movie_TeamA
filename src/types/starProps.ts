export interface StarRatingProps {
  onChange?: (score: number) => void;
  score?: number;
}

export interface StarDisplayProps {
  rating: number;
  size?: number;
  className?: string;
}
