import { FaHeart } from 'react-icons/fa';
import StarDisplay from './StarDisplay';
import { AllReviewProps } from '../../types/review';

const AllReview = ({
  username,
  createdAt,
  content,
  rating,
  likes,
  onLike,
}: AllReviewProps) => {
  const formatDate = (iso: string) => {
    const d = new Date(iso);
    const Y = d.getFullYear();
    const M = String(d.getMonth() + 1).padStart(2, '0');
    const D = String(d.getDate()).padStart(2, '0');
    const h = String(d.getHours()).padStart(2, '0');
    const m = String(d.getMinutes()).padStart(2, '0');
    return `${Y}.${M}.${D} ${h}:${m}`;
  };

  return (
    <div className='flex-1'>
      <div className='mx-4 mt-5 mb-5 w-[90%] rounded-lg border-2 bg-white pb-4'>
        <div className='mb-2 flex items-center justify-between gap-3 px-3 pt-4 text-black'>
          <span className='font-semibold'>{username}</span>
          <span className='text-xs text-gray-500'>{formatDate(createdAt)}</span>
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
