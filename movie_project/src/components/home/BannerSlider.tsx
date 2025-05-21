import { useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { scrollToIndex } from '../../utils/scrollToIndex';
import banner1 from '../../assets/banner/banner1.jpg';
import banner2 from '../../assets/banner/banner2.jpg';
import banner3 from '../../assets/banner/banner3.jpg';
import banner4 from '../../assets/banner/banner4.jpg';
import banner5 from '../../assets/banner/banner5.jpg';

const banners: string[] = [banner1, banner2, banner3, banner4, banner5];

export default function BannerSlider() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [current, setCurrent] = useState<number>(0);

  const scrollTo = (index: number) => {
    scrollToIndex(scrollRef.current, index, setCurrent);
  };

  const handlePrev = () => scrollTo(Math.max(0, current - 1));
  const handleNext = () => scrollTo(Math.min(banners.length - 1, current + 1));

  return (
    <section className='relative mx-auto w-full max-w-4xl'>
      <div className='flex overflow-hidden scroll-smooth' ref={scrollRef}>
        {banners.map((banner, idx) => (
          <img
            key={idx}
            src={banner}
            alt={`banner${idx + 1}`}
            className='h-56 w-full flex-shrink-0 object-cover'
          />
        ))}
      </div>

      <button
        onClick={handlePrev}
        className='bg-opacity-50 absolute top-1/2 left-2 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-black p-2 text-white'
      >
        <FaChevronLeft />
      </button>

      <button
        onClick={handleNext}
        className='bg-opacity-50 absolute top-1/2 right-2 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-black p-2 text-white'
      >
        <FaChevronRight />
      </button>

      <div className='mt-4 flex justify-center gap-2'>
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollToIndex(scrollRef.current, idx, setCurrent)}
            className={`h-2 w-2 cursor-pointer rounded-full transition-all duration-300 ${
              idx === current ? 'scale-110 bg-white' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
