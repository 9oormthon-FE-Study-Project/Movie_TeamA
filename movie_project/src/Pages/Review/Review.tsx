//Review

import { Link } from "react-router-dom";
import { useState, useMemo, useRef } from "react";
import StarRating from "./starRating";
import poster from "./assets/포스터.jpg";
import BestReviewSlide from "./bestReviewSlide";
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';
import AllReview from "./allReview";
import AllReviewDropdown from "./allReviewDropdown";

export default function Review() {
  const content =
    "지킬 게 생긴 킬러 VS 잃을 게 없는 킬러 40여 년간 감정 없이 바퀴벌레 같은 인간들을 방역해온 60대 킬러 ‘조각’(이혜영). ‘대모님’이라 불리며 살아있는 전설로 추앙받지만 오랜 시간 몸담은 회사 ‘신성방역’에서도 점차 한물간 취급을 받는다. 한편, 평생 ‘조각’을 쫓은 젊고 혈기 왕성한 킬러 ‘투우’(김성철)는 ‘신성방역’의 새로운 일원이 되고 ‘조각’에게서 시선을 떼지 않는다. 스승 ‘류’(김무열)와 지켜야 할 건 만들지 말자고 약속했던 ‘조각’은 예기치 않게 상처를 입은 그날 밤, 자신을 치료해 준 수의사 ‘강선생’(연우진)과 그의 딸에게 남다른 감정을 느낀다. ‘투우’는 그런 낯선 ‘조각’의 모습에 분노가 폭발하는데… 삶의 끝자락에서, 가장 강렬한 대결이 시작된다!";

  const [isShowMore, setIsShowMore] = useState(false);
  const textLimit = useRef(100);

  // 리뷰 작성 input 상태 추가
  const [reviewInput, setReviewInput] = useState<string>("");

  const commenter = useMemo(() => {
    const shortReview = content.slice(0, textLimit.current);
    if (content.length > textLimit.current) {
      if (isShowMore) return content;
      return shortReview;
    }
    return content;
  }, [isShowMore, content]);

  // (예시) 리뷰 등록 버튼 클릭 시 처리
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewInput.trim()) {
      alert("리뷰를 입력해주세요.");
      return;
    }
    alert(`등록된 리뷰: ${reviewInput}`);
    setReviewInput(""); // 입력값 초기화
  };

  return (
    <div className="bg-black text-white">
      {/* 포스터 배경 + 검정 오버레이 */}
      <section
        className="relative h-140 bg-black"
        style={{
          backgroundImage: `url(${poster})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60 z-0" />
        <div className="absolute bottom-0 left-0 z-10 ">
          <div className="text-white font-bold">
            <h1 className="text-4xl">파과</h1>
            <p className="text-2xl">2025.04.30</p>
            <p className="text-2xl">액션</p>
          </div>
        </div>
      </section>

      {/* 줄거리리 내용 */}
      <section className="my-8">
        <h1 className="text-xl font-bold text-white">줄거리</h1>
        <div className="container">
          <span className="content ">{commenter}</span>
          <div
            className="content-toggle cursor-pointer text-blue-600 font-semibold"
            onClick={() => setIsShowMore(!isShowMore)}
          >
            {content.length > textLimit.current &&
              (isShowMore ? "[접기]" : "[더 보기]")}
          </div>
        </div>
      </section>

      {/* 평점 */}
      <section className="my-8">
          <h1 className="text-xl font-bold">평점</h1>
          <div className="flex justify-center items-center gap-1 text-3xl ">
          <FaStar className="text-yellow-400" />
          <FaStar className="text-yellow-400" />
          <FaStar className="text-yellow-400" />
          <FaStar className="text-yellow-400" />
          <FaStar className="text-yellow-400" />
          <h1 className="m-3 font-bold"> 4.8 </h1>
          </div>
      </section>

      {/* 후기 작성 */}
      <section className="my-8">
        <h1 className="text-xl font-bold">리뷰쓰기</h1>
        <form onSubmit={handleReviewSubmit} className="flex flex-col gap-2 mt-2 max-w-lg items-center">
          <input
            type="text"
            value={reviewInput}
            onChange={(e) => setReviewInput(e.target.value)}
            className="h-40 w-98 border-gray-300 rounded-lg px-3 py-2 focus:outline-none border-2"
          />
        </form>
        <div className="flex items-center gap-2  justify-between mt-1" >
        <StarRating />
        <button
            type="submit"
            className="border px-4 py-1 rounded  "
          >
            리뷰 등록
          </button>
        </div>
      </section>


      {/* 베스트 후기 */}
      <section className="">
        <BestReviewSlide />
      </section>

      {/* 전체 후기 */}
      <section className="">
        <div className="flex justify-between items-center z-10 mb-5">
          <h1 className="text-xl font-bold"> 전체 리뷰</h1>
          <AllReviewDropdown/>
        </div>
        <AllReview />
        <AllReview />
        <AllReview />
        <AllReview />
      </section>
    </div>
  );
}
//Review

