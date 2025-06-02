import { useState } from 'react';
import Plot from '../components/review/Plot';
import Poster from '../components/review/Poster';
import WriteReview from '../components/review/WriteReview';
import BestReviewSlide from '../components/review/BestReviewSlide';
import AllReviewDropdown from '../components/review/AllReviewDropdown';
import AllReview from '../components/review/AllReview';
import StarAverage from '../components/review/StarAverage';

export type ReviewData = {
  content: string;
  rating: number;
};

const Review = () => {
  const [reviews, setReviews] = useState<ReviewData[]>([]);

  const handleNewReview = (newReview: ReviewData) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  return (
    <div className='bg-black text-white'>
      <Poster />
      <Plot />
      <StarAverage />
      <WriteReview onSubmitReview={handleNewReview} />
      <BestReviewSlide />
      <div className='mt-4 flex items-center justify-between px-4'>
        <h1 className='z-10 mx-2 mb-5 text-xl font-bold'>전체 리뷰</h1>
      </div>
      <div>
        {reviews.map((review, i) => (
          <AllReview key={i} content={review.content} rating={review.rating} />
        ))}
      </div>
    </div>
  );
};

export default Review;
