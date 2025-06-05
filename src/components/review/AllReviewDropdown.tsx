import { useState } from 'react';

const AllReviewDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const options = ['최신순', '오래된순', '인기순', '평점높은순', '평점낮은순'];

  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  const onOptionClicked = (value: string) => {
    setIsOpen(false);
  };

  return (
    <div className='relative inline-block text-left'>
      <button
        onClick={onToggle}
        className='rounded-full px-3 py-1 text-white transition'
      >
        정렬하기
      </button>

      {isOpen && (
        <div className='absolute right-0 z-20 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/10'>
          <div className='py-1 text-sm text-gray-700'>
            {options.map((option) => (
              <button
                key={option}
                onClick={() => onOptionClicked(option)}
                className='w-full px-4 py-2 text-left hover:bg-gray-100'
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllReviewDropdown;
