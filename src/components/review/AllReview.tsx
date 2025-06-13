import { FaHeart } from 'react-icons/fa';
import StarDisplay from './StarDisplay';
import { AllReviewProps } from '../../types/review';
import useAuthStore from '../../store/authStore';

const AllReview = ({ content, rating, likes, onLike }: AllReviewProps) => {
  const username = useAuthStore((s) => s.username);
  return (
    <div className='flex-1'>
      <div className='mx-4 mb-5 w-[90%] rounded-lg border-2 bg-white pb-4'>
        <div className='mb-2 flex items-center gap-3 px-3 pt-4 text-black'>
          <span className='font-semibold'>{username}</span>
        </div>
        <hr className='m-auto my-2 w-[95%] border-t border-gray-200' />
        <div className='mb-2'>
          <p className='ml-3 text-xs text-gray-700'>{content}</p>
        </div>
        <hr className='m-auto my-2 w-[95%] border-t border-gray-200' />
        <div className='flex items-center justify-between pr-3'>
          <div className='flex items-center gap-2 px-3 pb-4'>
            <FaHeart
              onClick={onLike}
              className='cursor-pointer text-red-500 transition-colors hover:text-red-600'
              size={20}
            />
            <p className='text-sm text-gray-500'>{likes}</p>
          </div>
          <StarDisplay rating={rating} size={20} />
        </div>
      </div>
    </div>
  );
};

export default AllReview;
