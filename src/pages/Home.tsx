import BannerSlider from '../components/home/BannerSlider';
import CategorySlider from '../components/home/CategorySlider';
import Nav from '../components/home/Nav';
import PopularMovie from '../components/home/PopularMovie';
import TopReview from '../components/home/TopReview';
import SearchOverlay from './SearchOverlay';
import { useState } from 'react';

export default function Home() {
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchFocus = () => setShowSearchOverlay(true);
  const handleSearchOverlayClose = () => setShowSearchOverlay(false);

  return (
    <div>
      <Nav
        onSearchFocus={handleSearchFocus}
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
      />
      <BannerSlider />
      <CategorySlider />
      <PopularMovie />
      <TopReview />
      {showSearchOverlay && (
        <SearchOverlay
          searchTerm={searchTerm}
          onClose={handleSearchOverlayClose}
          onSearchTermChange={setSearchTerm}
        />
      )}
    </div>
  );
}