import { useState, useCallback, useEffect, MouseEvent } from 'react';
import { FaStar, FaRegStar, FaStarHalfAlt, FaRedo } from 'react-icons/fa';
import { StarRatingProps } from '../../types/starProps';



const Star = ({ index, score }: { index: number; score: number }) => {
  if (score >= index) return <FaStar />;
  if (score >= index - 0.5) return <FaStarHalfAlt />;
  return <FaRegStar />;
};

const StarRating = ({ onChange, score = 0 }: StarRatingProps) => {
  const [hoverScore, setHoverScore] = useState<number | null>(null);
  const [selectedScore, setSelectedScore] = useState<number>(score);
  const [isFixed, setIsFixed] = useState(false);

  const currentScore = hoverScore ?? selectedScore;

  useEffect(() => {
    setSelectedScore(score);
    setHoverScore(null);
    setIsFixed(false);
  }, [score]);

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>, index: number) => {
      if (isFixed) return;
      const { left, width } = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - left;
      const newScore = x < width / 2 ? index - 0.5 : index;
      setHoverScore(newScore);
    },
    [isFixed]
  );

  const handleClick = useCallback(
    (scoreValue: number) => {
      setSelectedScore(scoreValue);
      setIsFixed(true);
      onChange?.(scoreValue);
    },
    [onChange]
  );

  const handleReset = useCallback(() => {
    setSelectedScore(0);
    setHoverScore(null);
    setIsFixed(false);
    onChange?.(0);
  }, [onChange]);

  return (
    <div className='flex items-center'>
      <div className='flex cursor-pointer gap-1 text-3xl text-yellow-400'>
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className='flex h-8 w-8 items-center justify-center'
            onMouseMove={(e) => handleMouseMove(e, i)}
            onMouseLeave={() => !isFixed && setHoverScore(null)}
            onClick={() => handleClick(currentScore)}
          >
            <Star index={i} score={currentScore} />
          </div>
        ))}
      </div>
      <button
        type='button'
        onClick={handleReset}
        className='px-2'
        title='초기화'
      >
        <FaRedo />
      </button>
    </div>
  );
};

export default StarRating;
