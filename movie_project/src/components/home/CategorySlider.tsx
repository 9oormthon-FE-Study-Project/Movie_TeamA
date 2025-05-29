import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { parseCategoryName } from '../../utils/parseCategoryName';
import { paginate } from '../../utils/pagination';

const categories: string[] = [
  '액션 (Action)',
  '코미디 (Comedy)',
  '드라마 (Drama)',
  '애니메이션 (Animation)',
  '로맨스 (Romance)',
  '스릴러 (Thriller)',
  '공포 (Horror)',
  'SF (Fantasy)',
  '다큐멘터리 (Documentary)',
];

const ITEMS_PER_PAGE = 3;

const CategorySlider = () => {
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(categories.length / ITEMS_PER_PAGE);
  const visibleCategories = paginate(categories, page, ITEMS_PER_PAGE);

  return (
    <section className='bg-black py-4'>
      <div className='group relative flex items-center justify-center'>
        {/* 왼쪽 버튼 */}
        <button
          onClick={() => setPage(Math.max(0, page - 1))}
          disabled={page === 0}
          className='absolute left-0 z-10 cursor-pointer text-white opacity-0 transition duration-300 group-hover:opacity-100 disabled:opacity-30'
        >
          <FaChevronLeft size={20} />
        </button>

        {/* 카테고리 카드 */}
        <div className='flex gap-4'>
          {visibleCategories.map((category, idx) => (
            <div
              key={idx}
              className='flex h-16 w-30 cursor-pointer items-center justify-center rounded-md bg-neutral-800 px-2 text-center text-sm text-white transition hover:bg-neutral-700'
            >
              {parseCategoryName(category)}
            </div>
          ))}
        </div>

        {/* 오른쪽 버튼 */}
        <button
          onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
          disabled={page === totalPages - 1}
          className='absolute right-0 z-10 cursor-pointer text-white opacity-0 transition duration-300 group-hover:opacity-100 disabled:opacity-30'
        >
          <FaChevronRight size={20} />
        </button>
      </div>
    </section>
  );
};

export default CategorySlider;
