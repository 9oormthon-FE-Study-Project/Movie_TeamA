import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import requests from '../../api/requests';
import heart from '../../assets/icon/heart.svg';
import star from '../../assets/icon/star.svg';
import { Movie } from '../../types/movie';
import { Review } from '../../types/review';

export default function TopReview() {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [review, setReview] = useState<Review>({
    user: 'User1',
    comment: '너무 감동적인 영화였어요!',
    likes: 249,
  });

  useEffect(() => {
    fetchTopMovie();
  }, []);

  const fetchTopMovie = async () => {
    try {
      const res = await axios.get(requests.fetchKoreanTopMovies);
      const topMovie = res.data.results[0]; // 가장 인기 많은 1개 영화
      setMovie(topMovie);
    } catch (err) {
      console.error('리뷰용 영화 정보를 가져오지 못했습니다.', err);
    }
  };

  const renderStars = (vote: number) => {
    const starCount = Math.round(vote / 2); // 10점 만점 → 5점 만점
    return Array.from({ length: 5 }, (_, i) => (
      <img
        key={i}
        src={star}
        alt='별'
        className={`h-5 w-5 ${i < starCount ? 'opacity-100' : 'opacity-30'}`}
      />
    ));
  };

  if (!movie) return null;

  return (
    <section id='top-review' className='px-4'>
      <div className='mx-auto max-w-3xl'>
        <h2 className='mb-4 text-lg font-bold text-white'>인기 영화 리뷰</h2>

        <div className='flex items-center gap-4 rounded-2xl border border-gray-300 p-4 shadow-sm'>
          {/* 왼쪽: 포스터 + 닉네임 */}
          <div className='flex w-24 shrink-0 flex-col'>
            <h2 className='mb-2 text-sm text-white'>{review.user}</h2>
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt='poster'
              className='h-28 w-20 rounded-md object-cover'
            />
          </div>

          {/* 오른쪽: 리뷰 내용 */}
          <div className='flex h-full flex-1 flex-col justify-between'>
            {/* 별점 */}
            <div className='mb-1 flex gap-1'>
              {renderStars(movie.vote_average)}
            </div>

            {/* 리뷰 텍스트 */}
            <p className='mb-2 text-sm text-white'>{review.comment}</p>

            {/* 하트 */}
            <div className='flex items-center gap-1 text-sm text-white'>
              <img src={heart} alt='좋아요' className='h-5 w-5' />
              <span>{review.likes}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
