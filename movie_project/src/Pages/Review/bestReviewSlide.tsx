//bestReviewSlide

import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const bestReviews = [
  {
    nickname: "민주",
    rating: 4.5,
    content: "완전 재밌게 봤어요! 강추!",
    likes: 156,
  },
  {
    nickname: "민주",
    rating: 5,
    content: "연기가 살아있어요. 몰입도 최고!",
    likes: 123,
  },
  {
    nickname: "민주",
    rating: 4,
    content: "스토리가 신선해요. 다음 작품도 기대!",
    likes: 96,
  },
];

const renderStars = (rating: number) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) stars.push(<FaStar key={i} className="inline text-yellow-400" />);
    else if (rating >= i - 0.5) stars.push(<FaStarHalfAlt key={i} className="inline text-yellow-400" />);
    else stars.push(<FaRegStar key={i} className="inline text-yellow-400" />);
  }
  return stars;
};

const BestReviewSlide: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const len = bestReviews.length;

  const handlePrev = () => setCurrent((prev) => (prev - 1 + len) % len);
  const handleNext = () => setCurrent((prev) => (prev + 1) % len);

  return (
    <div className="my-8">
      <div className="text-xl font-bold mb-3">베스트 리뷰</div>
      <div className="flex items-center">
        {/* 좌 버튼 */}
        <button
          onClick={handlePrev}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-300 text-xl mr-2"
        >
          <FaChevronLeft />
        </button>
        {/* 슬라이드 내용 */}
        <div className="flex-1">
          <div className="h-50 border-2 border-gray-300 rounded-lg px-4 py-6 shadow-md">
            <div className=" flex gap-3 items-center mb-2 ">
              <span className="font-semibold">{bestReviews[current].nickname}</span>
              <span>{renderStars(bestReviews[current].rating)}</span>
            </div>
            <hr className="my-2" />
            <div className="mb-2">
              <p className="text-white">{bestReviews[current].content}</p>
            </div>
            <hr className="my-2" />
            <div>
              <p className="text-sm text-gray-500">공감 수 {bestReviews[current].likes}</p>
            </div>
          </div>
        </div>
        {/* 우 버튼 */}
        <button
          onClick={handleNext}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-300 text-xl ml-2"
        >
          <FaChevronRight />
        </button>
      </div>
      {/* 아래 점(dot) 네비게이터 */}
      <div className="flex justify-center gap-2 mt-3">
        {bestReviews.map((_, idx) => (
          <span
            key={idx}
            className={`inline-block w-2 h-2 rounded-full ${idx === current ? "bg-blue-600" : "bg-gray-300"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default BestReviewSlide;
