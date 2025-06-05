import { ReactNode } from 'react';

export const parseCategoryName = (category: string): ReactNode => {
  const match = category.match(/^(.+?) \((.+?)\)$/);
  if (!match) return category;
  return (
    <>
      {match[1]}
      <br />({match[2]})
    </>
  );
};
