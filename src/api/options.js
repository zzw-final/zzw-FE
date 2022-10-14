export const options = {
  basic: {
    select: (data) => data.data.data,
  },
  eternal: {
    cacheTime: Infinity,
    staleTime: Infinity,
    select: (data) => data?.data?.data,
  },
  halfhour: {
    cacheTime: 30 * 60 * 1000,
    staleTime: 30 * 60 * 1000,
    select: (data) => data?.data?.data,
  },
};
