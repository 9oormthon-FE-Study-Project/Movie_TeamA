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
