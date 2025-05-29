import { useEffect, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { scrollToIndex } from '../../utils/scrollToIndex';
import axios from '../../api/axios';
import requests from '../../api/requests';
import { Movie } from '../../types/movie';

const BannerSlider = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => {
        const nextIndex = (prev + 1) % movies.length;
        scrollToIndex(scrollRef.current, nextIndex, setCurrent);
        return nextIndex;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [movies]);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const res = await axios.get(requests.fetchNowPlaying);
        const limitedMovies = res.data.results.slice(0, 5);
        setMovies(limitedMovies);
      } catch (err) {
        console.error('배너 데이터를 불러오는 데 실패했습니다.', err);
      }
    };

    fetchNowPlaying();
  }, []);

  const scrollTo = (index: number) => {
    scrollToIndex(scrollRef.current, index, setCurrent);
  };

  const handlePrev = () => scrollTo(Math.max(0, current - 1));
  const handleNext = () => scrollTo(Math.min(movies.length - 1, current + 1));

  return (
    <section className='relative mx-auto w-full max-w-4xl'>
      <div className='flex overflow-hidden scroll-smooth' ref={scrollRef}>
        {movies.map((movie) => (
          <img
            key={movie.id}
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className='h-56 w-full flex-shrink-0 object-cover'
          />
        ))}
      </div>

      <button
        onClick={handlePrev}
        className='bg-opacity-50 absolute top-1/2 left-2 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-black p-2 text-white'
      >
        <FaChevronLeft />
      </button>

      <button
        onClick={handleNext}
        className='bg-opacity-50 absolute top-1/2 right-2 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-black p-2 text-white'
      >
        <FaChevronRight />
      </button>

      <div className='mt-4 flex justify-center gap-2'>
        {movies.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollToIndex(scrollRef.current, idx, setCurrent)}
            className={`h-2 w-2 cursor-pointer rounded-full transition-all duration-300 ${
              idx === current ? 'scale-110 bg-white' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default BannerSlider;
