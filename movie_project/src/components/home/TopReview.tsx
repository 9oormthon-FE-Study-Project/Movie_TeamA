import poster1 from '../../assets/poster/poster1.jpg';
import heart from '../../assets/icon/heart.svg';
import star from '../../assets/icon/star.svg';

export default function TopReview() {
  return (
    <section id='top-review' className='px-4'>
      <div className='mx-auto max-w-3xl'>
        <h2 className='mb-4 text-lg font-bold text-white'>인기 영화 리뷰</h2>

        <div className='flex items-center gap-4 rounded-2xl border border-gray-300 p-4 shadow-sm'>
          {/* 왼쪽: 포스터 + 닉네임 */}
          <div className='flex w-24 shrink-0 flex-col'>
            <h2 className='mb-2 text-sm text-white'>User1</h2>
            <img
              src={poster1}
              alt='poster'
              className='h-28 w-20 rounded-md object-cover'
            />
          </div>

          {/* 오른쪽: 리뷰 내용 */}
          <div className='flex h-full flex-1 flex-col justify-between'>
            {/* 별점 */}
            <div className='mb-1 flex gap-1'>
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <img key={i} src={star} alt='별' className='h-5 w-5' />
                ))}
            </div>

            {/* 리뷰 텍스트 */}
            <p className='mb-2 text-sm text-white'>너무 감동적인 영화였어요!</p>

            {/* 하트 */}
            <div className='flex items-center gap-1 text-sm text-white'>
              <img src={heart} alt='좋아요' className='h-5 w-5' />
              <span>249</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
