import { useMemo } from 'react';
import { FaHeart } from 'react-icons/fa';
import StarDisplay from './StarDisplay';
import { AllReviewProps } from '../../types/review';
import { formatDate } from '../../utils/formatDate';

const AllReview = ({
  username,
  createdAt,
  content,
  rating,
  likes,
  onLike,
}: AllReviewProps) => {
  const formattedDate = useMemo(() => formatDate(createdAt), [createdAt]);

  return (
    <div className='flex-1'>
      <div className='mx-4 mt-5 mb-5 w-[90%] rounded-lg border-2 bg-white pb-4'>
        <div className='mb-2 flex items-center justify-between gap-3 px-3 pt-4 text-black'>
          <span className='font-semibold'>{username}</span>
          <span className='text-xs text-gray-500'>{formattedDate}</span>
        </div>

        <hr className='m-auto my-2 w-[95%] border-t border-gray-200' />

        <div className='mb-2 px-3'>
          <p className='text-xs text-gray-700'>{content}</p>
        </div>

        <hr className='m-auto my-2 w-[95%] border-t border-gray-200' />

        <div className='flex items-center justify-between px-3 pb-4'>
          <button
            type='button'
            onClick={onLike}
            aria-label='좋아요'
            className='flex items-center gap-2 text-red-500 transition-colors hover:text-red-600'
          >
            <FaHeart size={20} />
            <span className='text-sm text-gray-500'>{likes}</span>
          </button>
          <StarDisplay rating={rating} size={20} />
        </div>
      </div>
    </div>
  );
};

export default AllReview;
