import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import requests from '../../api/requests';
import { Movie } from '../../types/movie';
import { FaStar } from 'react-icons/fa';

interface MovieResponse {
  results: Movie[];
}

const StarAverage = () => {
  const [rating, setRating] = useState<number | null>(null);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const res = await axios.get<MovieResponse>(requests.fetchNowPlaying);
        const vote = res.data.results[0]?.vote_average;
        setRating(typeof vote === 'number' ? vote : null);
      } catch (err) {
        console.error('별점 불러오기 실패:', err);
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
      <div className='flex items-center justify-center gap-1 text-3xl'>
        <h1 className='m-3 text-lg font-bold'>{rating.toFixed(1)} / 10</h1>
      </div>
    </section>
  );
};

export default StarAverage;
