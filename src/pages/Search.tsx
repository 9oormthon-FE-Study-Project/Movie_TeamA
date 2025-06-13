import React from 'react';
import { CiSearch } from 'react-icons/ci';
import { IoCloseOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

// 1. mockResults 대신 API에서 받아온 데이터를 사용
// 2. 클릭 시 영화별 리뷰 페이지로 이동하려면:
//   : handleResultClick에서 라우팅을 확장

// 임시 mock 데이터
const mockResults = [
  {
    title: '모아나',
    year: '2016년 영화',
    desc: '2016년 영화',
    img: '',
  },
  {
    title: '모아나 2',
    year: '2024년 영화',
    desc: '2024년 영화',
    img: '',
  },
  {
    title: '모아나 마우이',
    year: '',
    desc: '마우이 — 가상의 등장 인물',
    img: '',
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
  const navigate = useNavigate();
  const filteredResults = mockResults.filter(r => r.title.includes(searchTerm));

  const handlePosterClick = (result: any) => {
    navigate('/review');
    onClose();
  };

  const handleResultClick = (result: any) => {
    navigate('/review');
    if (onResultClick) {
      onResultClick(result);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="flex h-full w-[420px]   max-w-full rounded-2xl bg-black p-6 shadow-lg flex flex-col mt-0">
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
                          <span className='text-2xl'>포스터</span>
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay; 