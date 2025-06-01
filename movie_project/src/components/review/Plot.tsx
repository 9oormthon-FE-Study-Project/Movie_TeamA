import { useState, useMemo, useRef, useEffect } from 'react';
import axios from '../../api/axios';
import requests from '../../api/requests';
import { Movie } from '../../types/movie';

interface MovieResponse {
  results: Movie[];
}

const Plot = () => {
  const [plot, setPlot] = useState<string>('');
  const [isShowMore, setIsShowMore] = useState(false);
  const textLimit = useRef(100);

  useEffect(() => {
    const fetchPlot = async () => {
      try {
        const res = await axios.get<MovieResponse>(requests.fetchNowPlaying);
        const overview = res.data.results[0]?.overview;
        setPlot(overview || '줄거리 정보가 없습니다.');
      } catch (error) {
        console.error('줄거리 불러오기 실패:', error);
        setPlot('줄거리 정보를 불러오는 데 실패했습니다.');
      }
    };

    fetchPlot();
  }, []);

  const displayedText = useMemo(() => {
    if (plot.length <= textLimit.current) return plot;
    return isShowMore ? plot : plot.slice(0, textLimit.current) + '...';
  }, [isShowMore, plot]);

  return (
    <div className='mx-4 my-8 text-xs'>
      <h1 className='my-2 text-xl font-bold'>줄거리</h1>
      <p className='mb-2'>{displayedText}</p>
      {plot.length > textLimit.current && (
        <button
          onClick={() => setIsShowMore(!isShowMore)}
          className='text-blue-400 hover:underline'
        >
          {isShowMore ? '줄이기' : '더보기'}
        </button>
      )}
    </div>
  );
};

export default Plot;
