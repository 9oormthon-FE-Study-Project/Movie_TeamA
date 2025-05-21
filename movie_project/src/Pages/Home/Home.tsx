import { CiSearch } from 'react-icons/ci';
import { IoCloseOutline } from 'react-icons/io5';

import BannerSlider from './BannerSlider';
import CategorySlider from './CategorySlider';
import PopularMovie from './PopularMovie';
import TopReview from './TopReview';

export default function Home() {
  return (
    <div>
      <section
        id='search'
        className='mb-2 flex w-full justify-center bg-black px-4 py-2'
      >
        <div className='flex w-full max-w-2xl items-center rounded-full bg-neutral-900 px-4 py-2'>
          <input
            type='text'
            placeholder='검색어를 입력하세요...'
            className='flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none'
          />
          <div className='ml-2 flex items-center gap-3 text-2xl text-white'>
            <IoCloseOutline />
            <CiSearch />
          </div>
        </div>
      </section>

      <BannerSlider />

      <CategorySlider />

      <PopularMovie />

      <TopReview />
    </div>
  );
}
