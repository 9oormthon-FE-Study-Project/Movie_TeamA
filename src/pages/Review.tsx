import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Nav from '../components/home/Nav';
import Plot from '../components/review/Plot';
import Poster from '../components/review/Poster';
import WriteReview from '../components/review/WriteReview';
import BestReviewSlide from '../components/review/BestReviewSlide';
import AllReview from '../components/review/AllReview';
import StarAverage from '../components/review/StarAverage';

import { useReviewStore } from '../store/reviewStore';
import useAuthStore from '../store/authStore';
import { ReviewDataWithLikes } from '../types/review';
import AllReviewDropdown from '../components/review/AllReviewDropdown';

const Review = () => {
  const { movieId } = useParams();

  const reviews = useReviewStore((state) => state.reviews);
  const addReview = useReviewStore((state) => state.addReview);
  const addReviews = useReviewStore((state) => state.addReviews);

  const [likedReviewIds, setLikedReviewIds] = useState<number[]>([]);

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

  const handleToggleLike = async (reviewId: number) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('로그인이 필요합니다.');
        return;
      }

      const isLiked = likedReviewIds.includes(reviewId);
      const url = isLiked
        ? `/api/reviews/${reviewId}/unlike`
        : `/api/reviews/${reviewId}/like`;

      const res = await axios.post<ReviewDataWithLikes>(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedReview = res.data;

      // 리뷰 목록 업데이트
      useReviewStore.setState((prev) => ({
        reviews: prev.reviews.map((r) =>
          r.id === updatedReview.id ? updatedReview : r
        ),
      }));

      // 좋아요 상태 토글
      setLikedReviewIds((prev) =>
        isLiked ? prev.filter((id) => id !== reviewId) : [...prev, reviewId]
      );
    } catch (error) {
      console.error('좋아요 토글 실패:', error);
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
        onLike={(idx) => {
          const target = filteredReviews[idx];
          if (target) handleToggleLike(target.id);
        }}
      />
      <div className='mt-4 flex items-center justify-between px-4'>
        <h1 className='z-10 mx-2 mb-5 text-xl font-bold'>전체 리뷰</h1>
        <AllReviewDropdown />
      </div>
      <div>
        {filteredReviews.map((review) => (
          <AllReview
            key={review.id}
            username={review.username}
            content={review.content}
            rating={review.rating}
            likes={review.likes}
            onLike={() => handleToggleLike(review.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Review;
