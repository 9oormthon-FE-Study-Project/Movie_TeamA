// src/components/review/BestReviewSlide.tsx
import React, { useState, useEffect } from 'react';
import {
  FaChevronLeft,
  FaChevronRight,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
} from 'react-icons/fa';
import { ReviewDataWithLikes } from '../../pages/Review'; // 경로 주의

type Props = {
  reviews: ReviewDataWithLikes[];
};

const renderStars = (rating: number) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} className='inline text-yellow-400' />);
    } else if (rating >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} className='inline text-yellow-400' />);
    } else {
      stars.push(<FaRegStar key={i} className='inline text-yellow-400' />);
    }
  }
  return stars;
};

const BestReviewSlide = ({ reviews }: Props) => {
  const sorted = [...reviews].sort((a, b) => b.likes - a.likes);
  const top3 = sorted.slice(0, 3);

  const [current, setCurrent] = useState(0);
  const len = top3.length;

  const handlePrev = () => setCurrent((prev) => (prev - 1 + len) % len);
  const handleNext = () => setCurrent((prev) => (prev + 1) % len);

  useEffect(() => {
    if (len === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % len);
    }, 4000);
    return () => clearInterval(interval);
  }, [len]);

  if (len === 0) return null;

  return (
    <div className='my-8'>
      <div className='mb-3 ml-5 text-xl font-bold'>베스트 리뷰 (Top 3)</div>
      <div className='flex items-center'>
        <button onClick={handlePrev} className='mr-2 rounded-full p-2 text-xl'>
          <FaChevronLeft />
        </button>

        <div className='flex-1'>
          <div className='h-50 rounded-lg border-2 border-gray-300 bg-white px-3 pt-4 text-black shadow-md'>
            <div className='mb-2 flex items-center gap-3'>
              <span className='font-semibold'>
                {top3[current].content.slice(0, 5)}…
              </span>
              <span>{renderStars(top3[current].rating)}</span>
            </div>
            <hr className='my-2' />
            <div className='mb-2'>
              <p className='text-xs'>{top3[current].content}</p>
            </div>
            <hr className='my-2' />
            <div>
              <p className='text-xs'>공감 수 {top3[current].likes}</p>
            </div>
          </div>
        </div>

        <button onClick={handleNext} className='ml-2 rounded-full p-2 text-xl'>
          <FaChevronRight />
        </button>
      </div>

      <div className='mt-3 flex justify-center gap-2'>
        {top3.map((_, idx) => (
          <span
            key={idx}
            className={`inline-block h-2 w-2 rounded-full transition-all duration-300 ${
              idx === current ? 'scale-110 bg-blue-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default BestReviewSlide;
