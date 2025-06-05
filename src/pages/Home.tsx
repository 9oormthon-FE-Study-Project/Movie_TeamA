import BannerSlider from '../components/home/BannerSlider';
import CategorySlider from '../components/home/CategorySlider';
import Nav from '../components/home/Nav';
import PopularMovie from '../components/home/PopularMovie';
import TopReview from '../components/home/TopReview';

export default function Home() {
  return (
    <div>
      <Nav />
      <BannerSlider />
      <CategorySlider />
      <PopularMovie />
      <TopReview />
    </div>
  );
}