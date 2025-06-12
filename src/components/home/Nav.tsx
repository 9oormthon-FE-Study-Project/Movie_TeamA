import { CiSearch } from 'react-icons/ci';
import { IoCloseOutline, IoHomeOutline } from 'react-icons/io5';
import { FaUserCircle } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthPage =
    location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className='mb-2 flex w-full items-center justify-center bg-black px-4 py-2'>
      <div className='flex w-full max-w-5xl items-center justify-between gap-4'>
        <div className='cursor-pointer text-2xl text-white'>
          <IoHomeOutline onClick={() => navigate('/')} />
        </div>

        {!isAuthPage && (
          <div className='flex flex-1 items-center rounded-full bg-neutral-900 px-4 py-2'>
            <input
              type='text'
              placeholder='검색어를 입력하세요...'
              className='flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none'
            />
            <div className='ml-2 flex cursor-pointer items-center gap-3 text-2xl text-white'>
              <IoCloseOutline />
              <CiSearch />
            </div>
          </div>
        )}

        <div className='cursor-pointer text-2xl text-white'>
          <FaUserCircle onClick={() => navigate('/login')} />
        </div>
      </div>
    </div>
  );
};

export default Nav;
