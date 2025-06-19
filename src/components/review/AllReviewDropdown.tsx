import { useState } from 'react';
import { AllReviewDropdownProps } from '../../types/review';

const AllReviewDropdown = ({ onSelect }: AllReviewDropdownProps) => {
  const options = ['최신순', '오래된순', '인기순'] as const;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>('정렬하기');

  const onToggle = () => setIsOpen((prev) => !prev);

  const onOptionClicked = (value: (typeof options)[number]) => {
    setSelectedOption(value);
    setIsOpen(false);
    onSelect(value);
  };

  return (
    <div className='relative inline-block text-left'>
      <button
        onClick={onToggle}
        className='rounded-full px-3 py-1 text-white transition'
      >
        {selectedOption}
      </button>

      {isOpen && (
        <div className='absolute right-0 mt-1 mr-2 w-20 origin-top-right rounded-md bg-white shadow-lg ring-black/10'>
          <div className='py-1 text-sm text-gray-700'>
            {options.map((option) => (
              <button
                key={option}
                onClick={() => onOptionClicked(option)}
                className='w-full px-3 py-2 text-left hover:bg-gray-100'
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
