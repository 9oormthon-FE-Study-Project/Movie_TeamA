import { RequestMap } from '../types/api';

const requests: RequestMap = {
  // 배너용 (현재 상영 중인 영화)
  fetchNowPlaying: '/movie/now_playing',

  // 평점 높은 영화
  fetchTopRated: '/movie/top_rated',

  // 전체 트렌딩 (영화 + 시리즈, 주간 기준)
  fetchTrending: '/trending/all/week',

  // 한국 TOP 10 영화 (트렌딩 영화 중 국가 필터)
  fetchKoreanTopMovies: '/trending/movie/week',
};

export default requests;
