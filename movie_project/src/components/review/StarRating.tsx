import React, { useState, useCallback, useEffect } from 'react';
import { FaStar, FaRegStar, FaStarHalfAlt, FaRedo } from 'react-icons/fa';

type Props = {
  onChange?: (score: number) => void;
  score?: number; // 외부에서 받은 점수 (초기값 또는 리셋값)
};

const Star = ({ index, score }: { index: number; score: number }) => {
  if (score >= index) return <FaStar />;
  if (score >= index - 0.5) return <FaStarHalfAlt />;
  return <FaRegStar />;
};

function StarRating({ onChange, score = 0 }: Props) {
  const [hoverScore, setHoverScore] = useState<number | null>(null);
  const [selectedScore, setSelectedScore] = useState<number>(score);
  const [isFixed, setIsFixed] = useState<boolean>(false);

  const currentScore = hoverScore ?? selectedScore;

  // 외부에서 score가 바뀌었을 때 내부 상태를 초기화
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
      const hoveredScore = x < width / 2 ? index - 0.5 : index;
      setHoverScore(hoveredScore);
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
    onChange?.(0); // 부모에서 score 상태를 관리하고 있으므로 이걸로 리셋
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
}

export default StarRating;
