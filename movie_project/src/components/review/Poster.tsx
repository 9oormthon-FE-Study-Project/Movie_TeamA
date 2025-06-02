import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import requests from '../../api/requests';
import { Movie } from '../../types/movie';
import { Genre } from '../../types/genre';

interface MovieResponse {
  results: Movie[];
}

const Poster = () => {
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchPoster = async () => {
      try {
        const res = await axios.get<MovieResponse>(requests.fetchNowPlaying);
        const movies = res.data.results;

        setMovie(movies[0]);
      } catch (err) {
        console.error('영화 정보를 불러오는데 실패했습니다.', err);
      }
    };

    fetchPoster();
  }, []);

  if (!movie) {
    return <div className='py-10 text-center text-white'>로딩 중...</div>;
  }

  return (
    <div className='bg-black text-white'>
      <section
        className='relative h-100 bg-black'
        style={{
          backgroundImage: movie.backdrop_path
            ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
            : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className='absolute inset-0 z-0 bg-black/60' />
        <div className='absolute bottom-0 left-0 z-10'>
          <div className='mb-5 font-bold text-white'>
            <h1 className='ml-4 text-3xl'>
              {movie.title || movie.name || movie.original_name}
            </h1>
            <div className='ml-5 flex items-center gap-2'>
              <p className='text-1xl'>
                {movie.release_date || movie.first_air_date || '개봉일 미정'}
              </p>
              <p className='text-1xl'>
                {movie.genre_ids
                  ?.map((id) => Genre[id])
                  .filter(Boolean)
                  .join(', ') || '장르 정보 없음'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Poster;
