import star from '../assets/icon/star.svg';

export const renderStars = (vote: number) => {
  const starCount = Math.round(vote / 2);
  return Array.from({ length: 5 }, (_, i) => (
    <img
      key={i}
      src={star}
      alt='별'
      className={`h-5 w-5 ${i < starCount ? 'opacity-100' : 'opacity-30'}`}
    />
  ));
};
