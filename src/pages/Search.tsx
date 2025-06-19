// src/pages/Search.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  SearchResult,
  SearchOverlayProps,
  MovieSearchResponse,
} from '../types/search';
import axios from '../api/axios';
import requests from '../api/requests';

const SearchOverlay = ({
  searchTerm,
  onClose,
  onResultClick,
}: SearchOverlayProps) => {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSearch = async () => {
      if (!searchTerm.trim()) {
        setSearchResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const res = await axios.get<MovieSearchResponse>(
          requests.searchMovies,
          {
            params: { query: searchTerm },
          }
        );

        const results = res.data.results.map((movie) => ({
          title: movie.title || movie.name || '',
          year: movie.release_date
            ? movie.release_date.split('-')[0] + '년 영화'
            : '',
          desc: movie.overview || '',
          img: movie.poster_path
            ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
            : '',
          id: movie.id,
        }));

        setSearchResults(results);
      } catch (e) {
        console.error('검색 오류:', e);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(fetchSearch, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleResultClick = (result: SearchResult) => {
    if (result.id) {
      navigate(`/review/${result.id}`);
      onResultClick?.(result);
      onClose();
    }
  };

  return (
    <div className='w-full max-w-md h-full flex flex-col overflow-y-auto bg-black p-5'>
      <div className='overflow-y-auto px-4 max-h-[70vh]'>
        {isLoading ? (
          <div className='py-8 text-center text-gray-400'>
            <p className='mb-2 text-lg'>검색 중...</p>
          </div>
        ) : searchTerm ? (
          searchResults.length > 0 ? (
            <ul>
              {searchResults.map((result, idx) => (
                <li
                  key={idx}
                  className='flex cursor-pointer items-start gap-4 rounded-lg border-b border-gray-800 px-2 py-3 last:border-b-0 hover:bg-neutral-800'
                  onClick={() => handleResultClick(result)}
                >
                  {result.img ? (
                    <img
                      src={result.img}
                      alt={result.title}
                      className='h-20 w-14 flex-shrink-0 rounded object-cover'
                    />
                  ) : (
                    <div className='flex h-20 w-14 flex-shrink-0 items-center justify-center rounded bg-neutral-800'>
                      <span className='text-xs text-gray-500'>이미지 없음</span>
                    </div>
                  )}

                  <div className='flex flex-col'>
                    <div className='mb-1 text-lg font-semibold text-white'>
                      {result.title}
                    </div>
                    <div className='line-clamp-3 text-xs text-gray-400'>
                      {result.desc || result.year}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className='py-8 text-center text-gray-400'>
              <p className='mb-2 text-lg'>검색 결과가 없습니다</p>
              <p className='text-sm'>다른 검색어를 입력해보세요</p>
            </div>
          )
        ) : (
          <div className='py-8 text-center text-gray-400'>
            <p className='mb-2 text-lg'>검색어를 입력하세요</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchOverlay;
