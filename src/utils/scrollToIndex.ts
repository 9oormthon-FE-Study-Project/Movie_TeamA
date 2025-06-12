export const scrollToIndex = (
  container: HTMLDivElement | null,
  index: number,
  setCurrent?: (val: number) => void
) => {
  if (!container) return;
  const width = container.clientWidth;
  container.scrollTo({ left: index * width, behavior: 'smooth' });
  if (setCurrent) setCurrent(index);
};
