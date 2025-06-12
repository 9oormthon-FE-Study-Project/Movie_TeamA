import React from 'react';
import { CiSearch } from 'react-icons/ci';
import { IoCloseOutline } from 'react-icons/io5';

// 임시 mock 데이터
const mockResults = [
  {
    title: '모아나',
    year: '2016년 영화',
    img: 'https://image.tmdb.org/t/p/w200/4J1yUY1LI1V1Sg3yqfZlqF8g1bI.jpg',
    desc: '2016년 영화',
  },
  {
    title: '모아나 2',
    year: '2024년 영화',
    img: 'https://image.tmdb.org/t/p/w200/2QKjvQbKQdQKjvQbKQdQKjvQbKQ.jpg',
    desc: '2024년 영화',
  },
  {
    title: '모아나 ost',
    year: '',
    img: '',
    desc: '',
  },
  {
    title: '모아나 마우이',
    year: '',
    img: 'https://image.tmdb.org/t/p/w200/4J1yUY1LI1V1Sg3yqfZlqF8g1bI.jpg',
    desc: '마우이 — 가상의 등장 인물',
  },
];

const SearchOverlay = ({
  searchTerm,
  onClose,
  onSearchTermChange,
  onResultClick,
}: {
  searchTerm: string;
  onClose: () => void;
  onSearchTermChange: (v: string) => void;
  onResultClick?: (result: any) => void;
}) => {
  const filteredResults = mockResults.filter(r => r.title.includes(searchTerm));

  const handleResultClick = (result: any) => {
    if (onResultClick) {
      onResultClick(result);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex min-h-screen max-w-md items-center flex-col justify-center bg-black bg-opacity-80" style={{ minHeight: '100vh' }}>
      <div className="w-full max-w-md mt-20 flex flex-col">
        {/* 네비게이션 바와 동일한 검색창 */}
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
        {/* 검색 결과 */}
        <div className='flex min-h-screen items-center justify-center'>
          <div className='w-full max-w-md rounded-lg bg-black p-8 text-center shadow-md text-white
          '>
            {searchTerm ? (
              filteredResults.length > 0 ? (
                <ul>
                  {filteredResults.map((result, idx) => (
                    <li 
                      key={idx} 
                      className='flex items-center gap-4 py-3 border-b border-gray-800 last:border-b-0 cursor-pointer hover:bg-neutral-800 rounded-lg px-2'
                      onClick={() => handleResultClick(result)}
                    >
                      {result.img ? (
                        <img src={result.img} alt={result.title} className='w-14 h-14 rounded object-cover' />
                      ) : (
                        <div className='w-14 h-14 rounded bg-neutral-800 flex items-center justify-center'>
                          <span className='text-2xl'>🎬</span>
                        </div>
                      )}
                      <div>
                        <div className='font-semibold text-lg'>{result.title}</div>
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
                <p className='text-sm'>영화, TV 프로그램, 인물 등을 검색할 수 있습니다</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay; 