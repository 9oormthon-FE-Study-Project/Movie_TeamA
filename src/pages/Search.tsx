import React, { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { IoCloseOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { SearchResult, SearchOverlayProps } from '../types/search';
import axios from '../api/axios';
import requests from '../api/requests';
import { MovieSearchResponse } from '../types/search';

const SearchOverlay = ({
  searchTerm,
  onClose,
  onSearchTermChange,
  onResultClick,
}: SearchOverlayProps) => {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const searchMovies = async () => {
      if (!searchTerm.trim()) {
        setSearchResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await axios.get<MovieSearchResponse>(requests.searchMovies, {
          params: {
            query: searchTerm,
          },
        });

        const results = response.data.results.map(movie => ({
          title: movie.title || movie.name || '',
          year: movie.release_date ? movie.release_date.split('-')[0] + '년 영화' : '',
          desc: movie.overview || '',
          img: movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : '',
          id: movie.id,
        }));

        setSearchResults(results);
      } catch (error) {
        console.error('영화 검색 중 오류가 발생했습니다:', error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchMovies, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  const handleResultClick = (result: SearchResult) => {
    if (result.id) {
      navigate(`/review/${result.id}`);
      if (onResultClick) {
        onResultClick(result);
      }
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="flex h-full w-[420px] max-w-full rounded-2xl bg-black p-6 shadow-lg flex-col mt-0">
        <div className='flex w-full items-center justify-center px-4 py-2'>
          <div className='flex flex-1 items-center rounded-full bg-neutral-900 px-4 py-2'>
            <input
              type='text'
              placeholder='검색어를 입력하세요...'
              className='flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none'
              value={searchTerm}
              autoFocus
              onChange={e => onSearchTermChange(e.target.value)}
            />
            <div className='ml-2 flex cursor-pointer items-center gap-3 text-2xl text-white'>
              <IoCloseOutline onClick={() => onSearchTermChange('')} />
              <CiSearch />
              <button onClick={onClose} className='ml-2 text-2xl'>×</button>
            </div>
          </div>
        </div>
        <div className="mt-4 overflow-y-auto">
          {isLoading ? (
            <div className='text-gray-400 py-8 text-center'>
              <p className='text-lg mb-2'>검색 중...</p>
            </div>
          ) : searchTerm ? (
            searchResults.length > 0 ? (
              <ul>
                {searchResults.map((result, idx) => (
                  <li 
                    key={idx} 
                    className='flex items-center gap-4 py-3 border-b border-gray-800 last:border-b-0 cursor-pointer hover:bg-neutral-800 rounded-lg px-2'
                    onClick={() => handleResultClick(result)}
                  >
                    {result.img ? (
                      <img src={result.img} alt={result.title} className='w-14 h-14 rounded object-cover' />
                    ) : (
                      <div className='w-14 h-14 rounded bg-neutral-800 flex items-center justify-center'>
                        <span className='text-2xl'>포스터</span>
                      </div>
                    )}
                    <div>
                      <div className='font-semibold text-lg text-white'>{result.title}</div>
                      <div className='text-xs text-gray-400'>{result.desc || result.year}</div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className='text-gray-400 py-8 text-center'>
                <p className='text-lg mb-2'>검색 결과가 없습니다</p>
                <p className='text-sm'>다른 검색어를 입력해보세요</p>
              </div>
            )
          ) : (
            <div className='text-gray-400 py-8 text-center'>
              <p className='text-lg mb-2'>검색어를 입력하세요</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay; 