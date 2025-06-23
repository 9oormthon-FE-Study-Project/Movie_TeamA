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
import AllReviewDropdown from '../components/review/AllReviewDropdown';

import { useReviewStore } from '../store/reviewStore';
import useAuthStore from '../store/authStore';
import { ReviewDataWithLikes } from '../types/review';

const Review = () => {
  const { movieId } = useParams<{ movieId: string }>();

  const reviews = useReviewStore((s) => s.reviews);
  const addReview = useReviewStore((s) => s.addReview);
  const addReviews = useReviewStore((s) => s.addReviews);

  const [likedReviewIds, setLikedReviewIds] = useState<number[]>([]);
  const [sortOption, setSortOption] = useState<
    '최신순' | '오래된순' | '인기순'
  >('최신순');

  const filteredReviews = useMemo(
    () => reviews.filter((r) => String(r.movieId) === movieId),
    [reviews, movieId]
  );

  const sortedReviews = useMemo(() => {
    const copy = [...filteredReviews];
    if (sortOption === '인기순') {
      return copy.sort((a, b) => b.likes - a.likes);
    }
    if (sortOption === '오래된순') {
      return copy.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    }
    return copy.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [filteredReviews, sortOption]);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!movieId) return;
      try {
        const res = await axios.get<ReviewDataWithLikes[]>('/api/reviews', {
          params: { movieId },
        });
        addReviews(res.data);
      } catch (err) {
        console.error('리뷰 불러오기 실패:', err);
      }
    };
    fetchReviews();
  }, [movieId, addReviews]);

  const handleSubmitReview = async (data: {
    content: string;
    rating: number;
    movieId: number | string;
  }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }
    try {
      const username = useAuthStore.getState().username;
      const res = await axios.post<ReviewDataWithLikes>(
        '/api/reviews',
        {
          username,
          content: data.content,
          rating: data.rating,
          movieId: Number(data.movieId),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      addReview(res.data);
    } catch (error) {
      console.error('리뷰 작성 실패:', error);
    }
  };

  const handleToggleLike = async (reviewId: number) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }
    try {
      const isLiked = likedReviewIds.includes(reviewId);
      const url = isLiked
        ? `/api/reviews/${reviewId}/unlike`
        : `/api/reviews/${reviewId}/like`;
      const res = await axios.post<ReviewDataWithLikes>(
        url,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      useReviewStore.setState((prev) => ({
        reviews: prev.reviews.map((r) => (r.id === res.data.id ? res.data : r)),
      }));
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
      <Plot movieId={movieId!} />
      <StarAverage movieId={movieId!} />
      <WriteReview movieId={movieId!} onSubmitReview={handleSubmitReview} />

      <BestReviewSlide
        reviews={filteredReviews}
        onLike={(idx) => {
          const target = filteredReviews[idx];
          if (target) handleToggleLike(target.id);
        }}
      />

      <div className='mt-4 flex items-center justify-between px-4'>
        <h1 className='text-xl font-bold'>전체 리뷰</h1>
        <AllReviewDropdown onSelect={setSortOption} />
      </div>

      <div>
        {sortedReviews.map((review) => (
          <AllReview
            key={review.id}
            username={review.username}
            content={review.content}
            rating={review.rating}
            likes={review.likes}
            createdAt={review.createdAt}
            onLike={() => handleToggleLike(review.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Review;
