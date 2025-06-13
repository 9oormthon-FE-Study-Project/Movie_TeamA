import { useReviewStore } from '../store/reviewStore';
import Plot from '../components/review/Plot';
import Poster from '../components/review/Poster';
import WriteReview from '../components/review/WriteReview';
import BestReviewSlide from '../components/review/BestReviewSlide';
import AllReview from '../components/review/AllReview';
import StarAverage from '../components/review/StarAverage';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Review = () => {
  const { movieId } = useParams();
  const reviews = useReviewStore((state) => state.reviews);
  const addReview = useReviewStore((state) => state.addReview);
  const increaseLike = useReviewStore((state) => state.increaseLike);

  useEffect(() => {}, [movieId]);

  return (
    <div className='bg-black text-white'>
      {movieId && <Poster movieId={movieId} />}
      <Plot movieId={movieId} />
      <StarAverage movieId={movieId} />
      <WriteReview onSubmitReview={addReview} />
      <BestReviewSlide reviews={reviews} onLike={increaseLike} />

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
            onLike={() => increaseLike(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default Review;
