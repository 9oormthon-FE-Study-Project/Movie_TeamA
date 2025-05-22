//starRating

import React, { useState } from 'react';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';

type Props = {
  onChange?: (score: number) => void;
};

const StarRating: React.FC<Props> = ({ onChange }) => {
  const [hoverScore, setHoverScore] = useState<number | null>(null);
  const [selectedScore, setSelectedScore] = useState<number>(0);
  const [isFixed, setIsFixed] = useState<boolean>(false);

  const handleMouseMove = (e: React.MouseEvent, index: number) => {
    if (isFixed) return;
    const { left, width } = (e.target as HTMLDivElement).getBoundingClientRect();
    const x = e.clientX - left;
    const score = x < width / 2 ? index - 0.5 : index;
    setHoverScore(score);
  };

  const handleClick = (score: number) => {
    setSelectedScore(score);
    setIsFixed(true);
    onChange?.(score);
  };

  const handleReset = () => {
    setHoverScore(null);
    setSelectedScore(0);
    setIsFixed(false);
    onChange?.(0);
  };

  const renderStar = (index: number) => {
    const score = hoverScore ?? selectedScore;
    if (score >= index) return <FaStar />;
    else if (score >= index - 0.5) return <FaStarHalfAlt />;
    else return <FaRegStar />;
  };

  return (
    <div className='flex items-center'>
      <div className="flex gap-1 text-yellow-400 text-3xl cursor-pointer">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="w-8 h-8 flex items-center justify-center"
            onMouseMove={(e) => handleMouseMove(e, i)}
            onMouseLeave={() => !isFixed && setHoverScore(null)}
            onClick={() => handleClick(hoverScore ?? selectedScore)}
          >
            {renderStar(i)}
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={handleReset}
        className=" px-4 py-1 bg-gray-200 rounded text-sm text-gray-700 hover:bg-gray-300 transition"
      >
        초기화
      </button>
    </div>
  );
};

export default StarRating;
