import { useState } from 'react';
import Plot from '../components/review/Plot';
import Poster from '../components/review/Poster';
import WriteReview from '../components/review/WriteReview';
import BestReviewSlide from '../components/review/BestReviewSlide';
import AllReview from '../components/review/AllReview';
import StarAverage from '../components/review/StarAverage';
import { ReviewData, ReviewDataWithLikes } from '../types/review';

const Review = () => {
  const [reviews, setReviews] = useState<ReviewDataWithLikes[]>([]);

  const handleNewReview = (newReview: ReviewData) => {
    setReviews((prev) => [
      { content: newReview.content, rating: newReview.rating, likes: 0 },
      ...prev,
    ]);
  };

  const handleLikeReview = (index: number) => {
    setReviews((prev) =>
      prev.map((item, idx) =>
        idx === index ? { ...item, likes: item.likes + 1 } : item
      )
    );
  };

  return (
    <div className='bg-black text-white'>
      <Poster />
      <Plot />
      <StarAverage />
      <WriteReview onSubmitReview={handleNewReview} />
      <BestReviewSlide reviews={reviews} onLike={handleLikeReview} />

      <div className='mt-4 flex items-center justify-between px-4'>
        <h1 className='z-10 mx-2 mb-5 text-xl font-bold'>전체 리뷰</h1>
      </div>

      <div>
        {reviews.map((review, i) => (
          <AllReview
            key={i}
            content={review.content}
            rating={review.rating}
            likes={review.likes}
            onLike={() => handleLikeReview(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default Review;
