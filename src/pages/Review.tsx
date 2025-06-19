import { useReviewStore } from '../store/reviewStore';
import Plot from '../components/review/Plot';
import Poster from '../components/review/Poster';
import WriteReview from '../components/review/WriteReview';
import BestReviewSlide from '../components/review/BestReviewSlide';
import AllReview from '../components/review/AllReview';
import StarAverage from '../components/review/StarAverage';
import Nav from '../components/home/Nav';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
import axios from 'axios';
import { ReviewDataWithLikes } from '../types/review';
import useAuthStore from '../store/authStore';

const Review = () => {
  const { movieId } = useParams();
  const reviews = useReviewStore((state) => state.reviews);
  const addReview = useReviewStore((state) => state.addReview);
  const addReviews = useReviewStore((state) => state.addReviews);

  const increaseLike = useReviewStore((state) => state.increaseLike);

  const filteredReviews = useMemo(() => {
    return reviews.filter((r) => String(r.movieId) === movieId);
  }, [reviews, movieId]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        if (!movieId) return;

        const res = await axios.get<ReviewDataWithLikes[]>('/api/reviews', {
          params: { movieId },
        });

        console.log('리뷰 응답:', res.data);

        addReviews(res.data);
      } catch (err) {
        console.error('리뷰 불러오기 실패:', err);
      }
    };

    fetchReviews();
  }, [movieId]);

  const handleSubmitReview = async (data: {
    content: string;
    rating: number;
    movieId: number | string;
  }) => {
    try {
      const username = useAuthStore.getState().username;
      const token = localStorage.getItem('token');

      if (!token) {
        alert('로그인이 필요합니다.');
        return;
      }

      const res = await axios.post<ReviewDataWithLikes>(
        '/api/reviews',
        {
          username,
          content: data.content,
          rating: data.rating,
          movieId: Number(data.movieId),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('리뷰 등록 성공:', res.data);
      addReview(res.data);
    } catch (error) {
      console.error('리뷰 작성 실패:', error);
    }
  };

  return (
    <div className='bg-black text-white'>
      <Nav />
      {movieId && <Poster movieId={movieId} />}
      <Plot movieId={movieId} />
      <StarAverage movieId={movieId} />
      <WriteReview movieId={movieId!} onSubmitReview={handleSubmitReview} />
      <BestReviewSlide
        reviews={filteredReviews}
        onLike={(idx) => increaseLike(movieId!, idx)}
      />

      <div className='mt-4 flex items-center justify-between px-4'>
        <h1 className='z-10 mx-2 mb-5 text-xl font-bold'>전체 리뷰</h1>
      </div>

      <div>
        {filteredReviews.map((review, i) => (
          <AllReview
            key={i}
            username={review.username}
            content={review.content}
            rating={review.rating}
            likes={review.likes}
            onLike={() => increaseLike(movieId!, i)}
          />
        ))}
      </div>
    </div>
  );
};

export default Review;
