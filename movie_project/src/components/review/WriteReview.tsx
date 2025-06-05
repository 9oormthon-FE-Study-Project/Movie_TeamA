import { useState, FormEvent } from 'react';
import StarRating from './StarRating';
import { ReviewData } from '../../types/review';

interface Props {
  onSubmitReview: (data: ReviewData) => void;
}

const WriteReview = ({ onSubmitReview }: Props) => {
  const [reviewInput, setReviewInput] = useState('');
  const [selectedRating, setSelectedRating] = useState(0);

  const handleReviewSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!reviewInput.trim()) {
      alert('리뷰를 입력해주세요.');
      return;
    }
    alert('리뷰가 등록되었습니다.');
    onSubmitReview({
      content: reviewInput.trim(),
      rating: selectedRating,
    });
    setReviewInput('');
    setSelectedRating(0);
  };

  return (
    <section className='my-8'>
      <h1 className='ml-5 text-xl font-bold'>리뷰쓰기</h1>
      <form
        onSubmit={handleReviewSubmit}
        className='mt-2 flex flex-col items-center gap-2'
      >
        <textarea
          value={reviewInput}
          onChange={(e) => setReviewInput(e.target.value)}
          className='h-40 w-[90%] rounded-lg border-2 border-gray-300 bg-white px-3 py-2 text-black focus:outline-none'
        />
        <div className='mt-1 flex w-[90%] justify-between gap-2 p-2'>
          <StarRating
            score={selectedRating}
            onChange={(score) => setSelectedRating(score)}
          />
          <button type='submit' className='font-bold'>
            리뷰등록
          </button>
        </div>
      </form>
    </section>
  );
};

export default WriteReview;
