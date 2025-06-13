import React from 'react';
import { CiSearch } from 'react-icons/ci';
import { IoCloseOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { SearchResult, SearchOverlayProps } from '../types/search';

// 1. API 연결 시 아래 mock 데이터 대신 API 호출로 대체
// 2. useEffect를 사용하여 API 호출 구현

// 임시 mock 데이터
const mockResults: SearchResult[] = [
  {
    title: '모아나',
    year: '2016년 영화',
    desc: '2016년 영화',
    img: '',
    id: 1,
  },
  {
    title: '모아나 2',
    year: '2024년 영화',
    desc: '2024년 영화',
    img: '',
    id: 2,
  },
  {
    title: '모아나 마우이',
    year: '',
    desc: '마우이 — 가상의 등장 인물',
    img: '',
    id: 3,
  },
  {
    title: '인터스텔라',
    year: '2014년 영화',
    desc: '우주를 배경으로 한 SF 영화',
    img: '',
    id: 4,
  },
  {
    title: '인셉션',
    year: '2010년 영화',
    desc: '꿈 속의 꿈을 다룬 SF 영화',
    img: '',
    id: 5,
  },
];

const SearchOverlay: React.FC<SearchOverlayProps> = ({
  searchTerm,
  onClose,
  onSearchTermChange,
  onResultClick,
}) => {
  const navigate = useNavigate();
  // API 연결 시 아래 코드를 주석 처리하고 위의 useEffect 코드를 활성화
  const filteredResults = mockResults.filter(r => 
    r.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <div className='w-full max-w-md rounded-lg bg-black p-8 text-center shadow-md text-white'>
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
  );
};

export default SearchOverlay; 