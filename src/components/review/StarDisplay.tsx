import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { StarDisplayProps } from '../../types/starProps';


const StarDisplay = ({
  rating,
  size = 16,
  className = '',
}: StarDisplayProps) => {
  return (
    <div className={`flex gap-0.5 ${className}`}>
      {Array.from({ length: 5 }, (_, idx) => {
        const index = idx + 1;
        if (rating >= index) {
          return <FaStar key={idx} size={size} className='text-yellow-400' />;
        }
        if (rating >= index - 0.5) {
          return (
            <FaStarHalfAlt key={idx} size={size} className='text-yellow-400' />
          );
        }
        return <FaRegStar key={idx} size={size} className='text-yellow-400' />;
      })}
    </div>
  );
};

export default StarDisplay;
