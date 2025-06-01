import { Link } from 'react-router-dom';
import poster from '../assets/poster.jpg';
import { FaStar } from 'react-icons/fa';
import Plot from '../components/review/Plot';
import StarRating from '../components/review/StarRating';
import BestReviewSlide from '../components/review/BestReviewSlide';
import AllReviewDropdown from '../components/review/AllReviewDropdown';
import AllReview from '../components/review/AllReview';
import WriteReview from '../components/review/WriteReview';
import Poster from '../components/review/Poster';
import StarAverage from '../components/review/StarAverage';

const Review = () => {
  return (
    <div>
      <Poster />
      <Plot />
      <StarAverage />
      {/* 리뷰 작성 */}
      <WriteReview />

      {/* 베스트 리뷰 */}
      <section>
        <BestReviewSlide />
      </section>

      {/* 전체 리뷰 */}
      <section>
        <div className='z-10 mx-5 mb-5 flex items-center justify-between'>
          <h1 className='text-xl font-bold'>전체 리뷰</h1>
          <AllReviewDropdown />
        </div>
        {Array.from({ length: 4 }).map((_, i) => (
          <AllReview key={i} />
        ))}
      </section>
    </div>
  );
};

export default Review;
