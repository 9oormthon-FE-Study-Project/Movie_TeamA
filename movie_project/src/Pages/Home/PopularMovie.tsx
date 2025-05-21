import { useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import poster1 from '../../assets/poster/poster1.jpg';
import poster2 from '../../assets/poster/poster2.jpg';
import poster3 from '../../assets/poster/poster3.jpg';

const posters: string[] = [
  poster1,
  poster2,
  poster3,
  poster1,
  poster2,
  poster3,
  poster1,
  poster2,
  poster3,
  poster1,
];

export default function PopularMovie() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <section id='popular' className='bg-black py-6'>
      <div className='mx-auto max-w-6xl px-4'>
        <h2 className='mb-4 text-xl font-bold text-white'>TOP 10</h2>

        <div className='group relative'>
          {/* 왼쪽 버튼 */}
          <button
            onClick={scrollLeft}
            className='bg-opacity-50 absolute top-1/2 left-0 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-black p-2 text-white opacity-0 transition group-hover:opacity-100'
          >
            <FaChevronLeft />
          </button>

          {/* 슬라이드 영역 */}
          <div
            ref={scrollRef}
            className='scrollbar-hide flex gap-4 overflow-x-auto scroll-smooth'
          >
            {posters.map((poster, idx) => (
              <div
                key={idx}
                className='relative aspect-[2/3] w-[150px] shrink-0'
              >
                {/* 순위 숫자 */}
                <h2 className='absolute bottom-1 left-1 text-4xl font-extrabold text-white drop-shadow-md'>
                  {idx + 1}
                </h2>

                {/* 포스터 이미지 */}
                <img
                  src={poster}
                  alt={`poster${idx + 1}`}
                  className='h-full w-full rounded-md object-cover'
                />
              </div>
            ))}
          </div>

          {/* 오른쪽 버튼 */}
          <button
            onClick={scrollRight}
            className='bg-opacity-50 absolute top-1/2 right-0 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-black p-2 text-white opacity-0 transition group-hover:opacity-100'
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}
