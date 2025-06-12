import React from 'react';
import { CiSearch } from 'react-icons/ci';
import { IoCloseOutline } from 'react-icons/io5';

interface SearchOverlayProps {
  searchTerm: string;
  onClose: () => void;
  onSearchTermChange: (v: string) => void;
}
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

const SearchOverlay: React.FC<SearchOverlayProps> = ({ searchTerm, onClose, onSearchTermChange }) => {
  const filteredResults = mockResults.filter(r => r.title.includes(searchTerm));
  return (
    <div className='flex h-full w-full max-w-md flex-col bg-black bg-opacity-95 text-white'>
      {/* 네비게이션 바와 동일한 검색창 */}
      <div className='flex w-full items-center justify-center bg-black px-4 py-4'>
        <div className='flex w-full max-w-3xl items-center rounded-full bg-neutral-900 px-4 py-2'>
          <input
            type='text'
            placeholder='검색어를 입력하세요...'
            className='flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none text-lg'
            value={searchTerm}
            autoFocus
            onChange={e => onSearchTermChange(e.target.value)}
          />
          <div className='ml-2 flex items-center gap-3 text-2xl text-white'>
            <IoCloseOutline onClick={() => onSearchTermChange('')} className='cursor-pointer' />
            <CiSearch />
            <button onClick={onClose} className='ml-2 text-2xl'>×</button>
          </div>
        </div>
      </div>
      {/* 검색 결과 */}
      <div className='flex flex-1 justify-center items-start w-full'>
        <div className='w-full max-w-3xl bg-black bg-opacity-80 rounded-xl p-6 mt-2'>
          {searchTerm ? (
            filteredResults.length > 0 ? (
              <ul>
                {filteredResults.map((result, idx) => (
                  <li key={idx} className='flex items-center gap-4 py-3 border-b border-gray-800 last:border-b-0 cursor-pointer hover:bg-neutral-800 rounded-lg px-2'>
                    {result.img && <img src={result.img} alt={result.title} className='w-14 h-14 rounded object-cover' />}
                    <div>
                      <div className='font-semibold text-lg'>{result.title}</div>
                      <div className='text-xs text-gray-400'>{result.desc || result.year}</div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className='text-gray-400 py-8 text-center'>검색 결과가 없습니다.</div>
            )
          ) : (
            <div className='text-gray-400 py-8 text-center'>검색어를 입력하세요.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay; 