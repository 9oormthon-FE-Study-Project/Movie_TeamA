import { useState, useEffect, useMemo } from 'react';
import { FaChevronLeft, FaChevronRight, FaHeart } from 'react-icons/fa';
import StarDisplay from './StarDisplay';
import { BestReviewSlideProps } from '../../types/reviewProps';

const BestReviewSlide = ({ reviews, onLike }: BestReviewSlideProps) => {
  const top3 = useMemo(() => {
    return [...reviews].sort((a, b) => b.likes - a.likes).slice(0, 3);
  }, [reviews]);

  const len = top3.length;
  const [current, setCurrent] = useState(0);

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + len) % len);
  };
  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % len);
  };

  useEffect(() => {
    if (len === 0) return;
    const intervalId = setInterval(() => {
      setCurrent((prev) => (prev + 1) % len);
    }, 4000);
    return () => clearInterval(intervalId);
  }, [len]);

  useEffect(() => {
    if (current >= len) {
      setCurrent(0);
    }
  }, [len, current]);

  if (len === 0) return null;

  const { content, rating, likes } = top3[current];
  const originalIndex = reviews.findIndex(
    (r) => r.content === content && r.rating === rating && r.likes === likes
  );

  return (
    <div className='my-8'>
      <div className='mb-3 ml-5 text-xl font-bold'>베스트 리뷰</div>
      <div className='flex items-center'>
        <button onClick={handlePrev} className='mr-2 rounded-full p-2 text-xl'>
          <FaChevronLeft />
        </button>

        <div className='flex-1'>
          <div className='h-50 rounded-lg border-2 border-gray-300 bg-white px-3 pt-4 text-black shadow-md'>
            <div className='mb-2 flex items-center gap-3'>
              <span className='font-semibold'>{content.slice(0, 5)}…</span>
            </div>

            <hr className='m-auto my-2 border-t border-gray-200' />

            <div className='mb-2'>
              <p className='text-xs'>{content}</p>
            </div>

            <hr className='m-auto my-2 border-t border-gray-200' />

            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2 pt-1'>
                <FaHeart
                  onClick={() => {
                    if (onLike && originalIndex !== -1) {
                      onLike(originalIndex);
                    }
                  }}
                  className='cursor-pointer text-red-500 transition-colors hover:text-red-600'
                  size={20}
                />
                <p className='text-sm text-gray-500'>{likes}</p>
              </div>
              <StarDisplay rating={rating} size={20} />
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
