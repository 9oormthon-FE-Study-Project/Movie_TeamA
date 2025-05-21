import { CiSearch } from 'react-icons/ci';
import { IoCloseOutline } from 'react-icons/io5';
import { CiHeart } from 'react-icons/ci';
import { CiStar } from 'react-icons/ci';

import poster1 from '../../assets/poster/poster1.jpg';
import poster2 from '../../assets/poster/poster2.jpg';
import poster3 from '../../assets/poster/poster3.jpg';
import BannerSlider from './BannerSlider';

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

      <section id='category'>
        <div>
          <ul>
            <li>액션 (Action)</li>
            <li>코미디 (Comedy)</li>
            <li>드라마 (Drama)</li>
            <li>애니메이션 (Animation)</li>
            <li>로맨스 (Romance)</li>
            <li>스릴러 / 범죄 (Thriller / Crime)</li>
            <li>공포 / 호러 (Horror)</li>
            <li>SF / 판타지 (SF / Fantasy)</li>
          </ul>
        </div>
      </section>

      <section id='popular'>
        <div>
          <h2>현재 인기 영화</h2>
          <div>
            <div>
              <h2>1</h2>
              <img src={poster1} alt='poster1' />
            </div>
            <div>
              <h2>2</h2>
              <img src={poster2} alt='poster2' />
            </div>
            <div>
              <h2>3</h2>
              <img src={poster3} alt='poster3' />
            </div>
          </div>
        </div>
      </section>

      <section id='top-review'>
        <div>
          <h2>TOP 리뷰</h2>
          <div>
            <div>
              <h2>닉네임</h2>
              <img src={poster1} alt='poster1' />
            </div>
            <div>
              <CiStar />
              <p>리뷰내용 좋아요</p>
              <div>
                <CiHeart />
                <span>249</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
