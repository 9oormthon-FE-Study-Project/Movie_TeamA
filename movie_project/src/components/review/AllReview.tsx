import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

type Props = {
  content: string;
  rating: number;
};

const renderStars = (rating: number) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i)
      stars.push(<FaStar key={i} className='inline text-yellow-400' />);
    else if (rating >= i - 0.5)
      stars.push(<FaStarHalfAlt key={i} className='inline text-yellow-400' />);
    else stars.push(<FaRegStar key={i} className='inline text-yellow-400' />);
  }
  return stars;
};

const today = new Date();
const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일 ${today.getHours()}시 ${today.getMinutes()}분`;

const AllReview = ({ content, rating }: Props) => {
  return (
    <div className='flex-1'>
      <div className='mx-4 mb-5 w-[90%] rounded-lg border-2 bg-white pb-4'>
        <div className='mb-2 flex items-center gap-3 px-3 pt-4 text-black'>
          <span className='font-semibold'>닉네임</span>
          <span>{renderStars(rating)}</span>
        </div>
        <hr className='my-2' />
        <div className='mb-2'>
          <p className='ml-3 text-xs text-gray-700'>{content}</p>
        </div>
        <hr className='my-2' />
        <div>
          <p className='ml-3 text-sm text-gray-500'>공감 수 0</p>
        </div>
        <div>
          <p className='ml-3 text-sm text-gray-500'>{formattedDate}</p>
        </div>
      </div>
    </div>
  );
};

export default AllReview;
