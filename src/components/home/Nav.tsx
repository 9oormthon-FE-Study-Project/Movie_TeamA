import { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { IoCloseOutline, IoHomeOutline } from 'react-icons/io5';
import { FaUserCircle } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchOverlay from '../../pages/Search';

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const isAuthPage =
    location.pathname === '/login' || location.pathname === '/signup';

  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
    setSearchTerm('');
  };

  const handleSearchTermChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleHomeClick = () => {
    if (isSearchOpen) {
      setIsSearchOpen(false);
      setSearchTerm('');
    }
    navigate('/');
  };

  return (
    <>
      <div className='mb-2 flex w-full items-center justify-center bg-black px-4 py-2'>
        <div className='flex w-full max-w-5xl items-center justify-between gap-4'>
          <div className='cursor-pointer text-2xl text-white'>
            <IoHomeOutline onClick={handleHomeClick} />
          </div>

          {!isAuthPage && (
            <div className='flex flex-1 items-center rounded-full bg-neutral-900 px-4 py-2'>
              <input
                type='text'
                placeholder='검색어를 입력하세요...'
                className='flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={handleSearchClick}
              />
              <div className='ml-2 flex cursor-pointer items-center gap-3 text-2xl text-white'>
                <IoCloseOutline onClick={() => setSearchTerm('')} />
                <CiSearch onClick={handleSearchClick} />
              </div>
            </div>
          )}

          <div className='cursor-pointer text-2xl text-white'>
            <FaUserCircle onClick={() => navigate('/login')} />
          </div>
        </div>
      </div>

      {isSearchOpen && (
        <SearchOverlay
          searchTerm={searchTerm}
          onClose={handleSearchClose}
          onSearchTermChange={handleSearchTermChange}
          onResultClick={() => {}}
        />
      )}
    </>
  );
};

export default Nav;
