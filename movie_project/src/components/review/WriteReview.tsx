// components/review/WriteReview.tsx
import { useState } from 'react';
import StarRating from './StarRating';

export default function WriteReview() {
  const [reviewInput, setReviewInput] = useState<string>('');

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewInput.trim()) {
      alert('리뷰를 입력해주세요.');
      return;
    }
    alert(`등록된 리뷰: ${reviewInput}`);
    setReviewInput('');
  };

  return (
    <section className='my-8'>
      <h1 className='ml-5 text-xl font-bold'>리뷰쓰기</h1>
      <form
        onSubmit={handleReviewSubmit}
        className='mt-2 flex flex-col items-center gap-2'
      >
        <input
          type='text'
          value={reviewInput}
          onChange={(e) => setReviewInput(e.target.value)}
          className='h-40 w-[90%] rounded-lg border-2 border-gray-300 px-3 py-2 focus:outline-none'
        />
        <div className='mt-1 flex items-center justify-between gap-2'>
          <StarRating />
          <button type='submit' className='ml-10'>
            리뷰 등록
          </button>
        </div>
      </form>
    </section>
  );
}
