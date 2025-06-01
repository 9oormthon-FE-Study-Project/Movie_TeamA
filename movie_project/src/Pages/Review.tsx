import { Link } from 'react-router-dom';
import poster from '../assets/poster.jpg';
import { FaStar } from 'react-icons/fa';
import Plot from '../components/review/Plot';
import StarRating from '../components/review/StarRating';
import BestReviewSlide from '../components/review/BestReviewSlide';
import AllReviewDropdown from '../components/review/AllReviewDropdown';
import AllReview from '../components/review/AllReview';
import WriteReview from '../components/review/WriteReview';

export default function Review() {
  return (
    <div className='bg-black text-white'>
      {/* 포스터 배경 */}
      <section
        className='relative h-100 bg-black'
        style={{
          backgroundImage: `url(${poster})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className='absolute inset-0 z-0 bg-black/60' />
        <div className='absolute bottom-0 left-0 z-10'>
          <div className='mb-5 font-bold text-white'>
            <h1 className='ml-4 text-3xl'>릴로 & 스티치</h1>
            <div className='ml-5 flex items-center gap-2'>
              <p className='text-1xl'>2025.05.21</p>
              <p className='text-1xl'>애니메이션</p>
            </div>
          </div>
        </div>
      </section>

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
}
