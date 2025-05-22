//allReview

const AllReview = () => {

  return (
    <div className="flex-1 ">
      <div className="border-2 border-gray-300 rounded-lg px-7 py-6 bg-white shadow-md mb-5">
        <div className="flex gap-3 items-center mb-2 text-black">
          <span className="font-semibold">닉네임</span>
          <span>평점</span>
        </div>
        <hr className="my-2" />
        <div className="mb-2">
          <p className="text-gray-700">리뷰내용</p>
        </div>
        <hr className="my-2" />
        <div>
          <p className="text-sm text-gray-500">공감 수</p>
        </div>
      </div>
    </div>
  );
}

export default AllReview;