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

const Review = () => {
  return (
    <div>
      <Poster />

      {/* 줄거리 */}
      <section className='my-8 text-xs'>
        <Plot />
      </section>

      {/* 평점 */}
      <section className='my-8 ml-5'>
        <h1 className='text-xl font-bold'>평점</h1>
        <div className='flex items-center justify-center gap-1 text-3xl'>
          {Array.from({ length: 5 }).map((_, i) => (
            <FaStar key={i} className='text-yellow-400' />
          ))}
          <h1 className='m-3 font-bold'>4.8</h1>
        </div>
      </section>

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
