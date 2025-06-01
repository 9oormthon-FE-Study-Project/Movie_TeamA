import { useState } from 'react';
import StarRating from './StarRating';

const WriteReview = () => {
  const [reviewInput, setReviewInput] = useState('');

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewInput.trim()) {
      alert('리뷰를 입력해주세요.');
      return;
    }
    alert('리뷰가 등록되었습니다!');
    setReviewInput('');
  };

  return (
    <section className='my-8'>
      <h1 className='ml-5 text-xl font-bold'>리뷰쓰기</h1>
      <form
        onSubmit={handleReviewSubmit}
        className='bor mt-2 flex flex-col items-center gap-2'
      >
        <textarea
          value={reviewInput}
          onChange={(e) => setReviewInput(e.target.value)}
          className='h-40 w-[90%] rounded-lg border border-2 border-gray-300 px-3 py-2 focus:outline-none'
        />
        <div className='mt-1 flex items-center justify-between gap-2'>
          <StarRating />
          <button type='submit' className='ml-10 font-bold'>
            리뷰 등록
          </button>
        </div>
      </form>
    </section>
  );
};

export default WriteReview;
