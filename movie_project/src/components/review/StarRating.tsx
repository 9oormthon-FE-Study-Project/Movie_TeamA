import React, { useState, useCallback } from 'react';
import { FaStar, FaRegStar, FaStarHalfAlt, FaRedo } from 'react-icons/fa';

type Props = {
  onChange?: (score: number) => void;
};

type StarProps = { index: number; score: number };

const Star = ({ index, score }: StarProps) => {
  if (score >= index) return <FaStar />;
  if (score >= index - 0.5) return <FaStarHalfAlt />;
  return <FaRegStar />;
};

const StarRating: React.FC<Props> = ({ onChange }) => {
  const [hoverScore, setHoverScore] = useState<number | null>(null);
  const [selectedScore, setSelectedScore] = useState<number>(0);
  const [isFixed, setIsFixed] = useState(false);

  const currentScore = hoverScore ?? selectedScore;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent, index: number) => {
      if (isFixed) return;
      const { left, width } = (
        e.target as HTMLDivElement
      ).getBoundingClientRect();
      const x = e.clientX - left;
      const score = x < width / 2 ? index - 0.5 : index;
      setHoverScore(score);
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
    setHoverScore(null);
    setSelectedScore(0);
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
        className='pr-9 pl-2'
        title='초기화'
      >
        <FaRedo />
      </button>
    </div>
  );
};

export default StarRating;
