//allReviewDropdown

import { useState } from "react";

const AllReviewDropdown = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onToggle = () => setIsOpen(!isOpen);
  const onOptionClicked = (value: string, index: number) => {
    console.log(value);
    setIsOpen(false);
  }
  return (
    <div className="dropdown">
      <button className="dropbtn" onClick={onToggle}>정렬하기</button>
      <div className="dropdown-content">
        {isOpen && (
          <>
            <a href="#">최신순</a>
            <a href="#">오래된순</a>
            <a href="#">인기순</a>
            <a href="#">평점높은순</a>
            <a href="#">평점낮은순</a>
          </>
        )}
      </div>
    </div>
  );
}

export default AllReviewDropdown;