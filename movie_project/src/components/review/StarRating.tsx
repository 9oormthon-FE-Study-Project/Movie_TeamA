import React, { useState, useCallback, useEffect } from 'react';
import { FaStar, FaRegStar, FaStarHalfAlt, FaRedo } from 'react-icons/fa';

type Props = {
  onChange?: (score: number) => void;
  score?: number;
};

const Star = ({ index, score }: { index: number; score: number }) => {
  if (score >= index) return <FaStar />;
  if (score >= index - 0.5) return <FaStarHalfAlt />;
  return <FaRegStar />;
};

const StarRating = ({ onChange, score = 0 }: Props) => {
  const [hoverScore, setHoverScore] = useState<number | null>(null);
  const [selectedScore, setSelectedScore] = useState<number>(score);
  const [isFixed, setIsFixed] = useState<boolean>(false);

  const currentScore = hoverScore ?? selectedScore;

  useEffect(() => {
    setSelectedScore(score);
    setHoverScore(null);
    setIsFixed(false);
  }, [score]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent, index: number) => {
      if (isFixed) return;

      const { left, width } = (
        e.target as HTMLDivElement
      ).getBoundingClientRect();
      const x = e.clientX - left;
      const newScore = x < width / 2 ? index - 0.5 : index;
      setHoverScore(newScore);
    },
    [isFixed]
  );

  const handleClick = useCallback(
    (score: number) => {
      setSelectedScore(score);
      setIsFixed(true);
      onChange?.(score);
    },
    [onChange]
  );

  const handleReset = useCallback(() => {
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
        className='pr-9 pl-2'
        title='초기화'
      >
        <FaRedo />
      </button>
    </div>
  );
};

export default StarRating;
