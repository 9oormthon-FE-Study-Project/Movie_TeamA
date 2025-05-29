import { CiSearch } from 'react-icons/ci';
import { IoCloseOutline, IoHomeOutline } from 'react-icons/io5';
import { FaUserCircle } from 'react-icons/fa';

export default function Nav() {
  return (
    <div className='mb-2 flex w-full items-center justify-center bg-black px-4 py-2'>
      <div className='flex w-full max-w-5xl items-center justify-between gap-4'>
        {/* 왼쪽: 홈 아이콘 */}
        <div className='cursor-pointer text-2xl text-white'>
          <IoHomeOutline />
        </div>

        {/* 가운데: 검색창 */}
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

        {/* 오른쪽: 프로필 아이콘 */}
        <div className='cursor-pointer text-2xl text-white'>
          <FaUserCircle />
        </div>
      </div>
    </div>
  );
}
