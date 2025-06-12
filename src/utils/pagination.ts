export const paginate = <T>(list: T[], page: number, size: number): T[] => {
  return list.slice(page * size, (page + 1) * size);
};
