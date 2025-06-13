import { useState, useMemo, useRef, useEffect } from 'react';
import axios from '../../api/axios';
import { Movie } from '../../types/movie';
import { PlotProps } from '../../types/reviewProps';

const Plot = ({ movieId }: PlotProps) => {
  const [plot, setPlot] = useState('');
  const [isShowMore, setIsShowMore] = useState(false);
  const limit = useRef(100);

  useEffect(() => {
    if (!movieId) return;

    const fetchPlot = async () => {
      try {
        const res = await axios.get<Movie>(`/movie/${movieId}`);
        const overview = res.data.overview;
        setPlot(overview || '줄거리 정보가 없습니다.');
      } catch (error) {
        setPlot('줄거리 정보를 불러오는 데 실패했습니다.');
      }
    };

    fetchPlot();
  }, [movieId]);

  const displayedText = useMemo(() => {
    if (plot.length <= limit.current) return plot;
    return isShowMore ? plot : plot.slice(0, limit.current) + '...';
  }, [isShowMore, plot]);

  return (
    <div className='mx-4 my-8 text-xs'>
      <h1 className='my-2 text-xl font-bold'>줄거리</h1>
      <p className='mb-2'>{displayedText}</p>
      {plot.length > limit.current && (
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
