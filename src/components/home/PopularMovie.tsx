import { useEffect, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { scrollToIndex } from '../../utils/scrollToIndex';
import axios from '../../api/axios';
import requests from '../../api/requests';
import { Movie, MovieResponse } from '../../types/movie';
import { useNavigate } from 'react-router-dom';

const PopularMovie = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopMovies = async () => {
      try {
        const response = await axios.get<MovieResponse>(
          requests.fetchKoreanTopMovies
        );
        const top10 = response.data.results.slice(0, 10);
        setMovies(top10);
      } catch (error) {
        console.error('Top 10 영화 정보를 가져오는 데 실패했습니다.', error);
      }
    };

    fetchTopMovies();
  }, []);

  const scrollTo = (index: number) => {
    scrollToIndex(scrollRef.current, index, setCurrent);
  };

  const handlePrev = () => scrollTo(Math.max(0, current - 1));
  const handleNext = () => scrollTo(Math.min(movies.length - 1, current + 1));

  return (
    <section id='popular' className='bg-black py-6'>
      <div className='mx-auto max-w-6xl px-4'>
        <h2 className='mb-4 text-xl font-bold text-white'>TOP 10</h2>

        <div className='group relative'>
          <button
            onClick={handlePrev}
            className='bg-opacity-50 absolute top-1/2 left-0 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-black p-2 text-white opacity-0 transition group-hover:opacity-100'
          >
            <FaChevronLeft />
          </button>

          <div
            ref={scrollRef}
            className='scrollbar-hide flex gap-4 overflow-x-auto scroll-smooth'
          >
            {movies.map((movie, idx) => (
              <div
                key={movie.id}
                className='relative aspect-[2/3] w-[150px] shrink-0'
                onClick={() => navigate(`/review/${movie.id}`)}
              >
                <h2 className='absolute bottom-1 left-1 text-4xl font-extrabold text-white drop-shadow-md'>
                  {idx + 1}
                </h2>
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title || movie.name || movie.original_name}
                  className='h-full w-full rounded-md object-cover'
                />
              </div>
            ))}
          </div>

          <button
            onClick={handleNext}
            className='bg-opacity-50 absolute top-1/2 right-0 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-black p-2 text-white opacity-0 transition group-hover:opacity-100'
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PopularMovie;
