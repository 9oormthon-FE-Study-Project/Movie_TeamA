import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import requests from '../../api/requests';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';
import { MovieResponse } from '../../types/movie';

const Star = ({ index, score }: { index: number; score: number }) => {
  if (score >= index) return <FaStar />;
  if (score >= index - 0.5) return <FaStarHalfAlt />;
  return <FaRegStar />;
};

const StarAverage = () => {
  const [rating, setRating] = useState<number | null>(null);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const response = await axios.get<MovieResponse>(
          requests.fetchNowPlaying
        );
        const vote = response.data.results[0]?.vote_average;
        setRating(typeof vote === 'number' ? vote / 2 : null);
      } catch (err) {
        setRating(null);
      }
    };

    fetchRating();
  }, []);

  if (rating === null) {
    return (
      <div className='py-4 text-center text-white'>
        별점 정보를 불러오는 중...
      </div>
    );
  }

  return (
    <section className='my-8 ml-5'>
      <h1 className='text-xl font-bold'>평점</h1>
      <div className='flex items-center justify-center gap-1'>
        <div className='flex items-center justify-center gap-1 text-3xl text-yellow-400'>
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} index={i + 1} score={rating} />
          ))}
        </div>
        <span className='ml-3 text-lg font-bold'>{rating.toFixed(1)} / 5</span>
      </div>
    </section>
  );
};

export default StarAverage;
