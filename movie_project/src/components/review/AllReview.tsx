//AllReview

const AllReview = () => {
  return (
    <div className='flex-1'>
      <div className='mx-4 mb-5 w-[90%] rounded-lg border-2 bg-white pb-4'>
        <div className='mb-2 flex items-center gap-3 px-3 pt-4 text-black'>
          <span className='font-semibold'>닉네임</span>
          <span>평점</span>
        </div>
        <hr className='my-2' />
        <div className='mb-2'>
          <p className='ml-3 text-xs text-gray-700'>리뷰내용</p>
        </div>
        <hr className='my-2' />
        <div>
          <p className='ml-3 text-sm text-gray-500'>공감 수</p>
        </div>
      </div>
    </div>
  );
};

export default AllReview;
