import { useState } from 'react';
import StarRating from './StarRating';
import { ReviewData } from '../../pages/Review';

type Props = {
  onSubmitReview: (data: ReviewData) => void;
};

const WriteReview = ({ onSubmitReview }: Props) => {
  const [reviewInput, setReviewInput] = useState('');
  const [selectedRating, setSelectedRating] = useState(0);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewInput.trim()) {
      alert('리뷰를 입력해주세요.');
      return;
    }
    onSubmitReview({ content: reviewInput.trim(), rating: selectedRating });
    setReviewInput('');
    setSelectedRating(0);
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
          <StarRating onChange={(score) => setSelectedRating(score)} />
          <button type='submit' className='ml-10 font-bold'>
            리뷰 등록
          </button>
        </div>
      </form>
    </section>
  );
};

export default WriteReview;
