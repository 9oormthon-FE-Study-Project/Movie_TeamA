import { useReviewStore } from '../store/reviewStore';
import Plot from '../components/review/Plot';
import Poster from '../components/review/Poster';
import WriteReview from '../components/review/WriteReview';
import BestReviewSlide from '../components/review/BestReviewSlide';
import AllReview from '../components/review/AllReview';
import StarAverage from '../components/review/StarAverage';
import Nav from '../components/home/Nav';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';

const Review = () => {
  const { movieId } = useParams();
  const reviews = useReviewStore((state) => state.reviews);
  const addReview = useReviewStore((state) => state.addReview);
  const increaseLike = useReviewStore((state) => state.increaseLike);

  const filteredReviews = useMemo(() => {
    return reviews.filter((r) => r.movieId === movieId);
  }, [reviews, movieId]);

  useEffect(() => {}, [movieId]);

  return (
    <div className='bg-black text-white'>
      <Nav />
      {movieId && <Poster movieId={movieId} />}
      <Plot movieId={movieId} />
      <StarAverage movieId={movieId} />
      <WriteReview movieId={movieId!} onSubmitReview={addReview} />
      <BestReviewSlide
        reviews={filteredReviews}
        onLike={(idx) => increaseLike(movieId!, idx)}
      />

      <div className='mt-4 flex items-center justify-between px-4'>
        <h1 className='z-10 mx-2 mb-5 text-xl font-bold'>전체 리뷰</h1>
      </div>

      <div>
        {filteredReviews.map((review, i) => (
          <AllReview
            key={i}
            content={review.content}
            rating={review.rating}
            likes={review.likes}
            onLike={() => increaseLike(movieId!, i)}
          />
        ))}
      </div>
    </div>
  );
};

export default Review;
