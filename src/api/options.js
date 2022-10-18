export const options = {
  noSelect: {
    staleTime: 10 * 1000,
  },
  basic: {
    staleTime: 10 * 1000,
    select: (data) => data.data.data,
  },
  nocache: {
    cacheTime: 0,
    select: (data) => data.data.data,
  },
  eternal: {
    cacheTime: Infinity,
    staleTime: Infinity,
    select: (data) => data.data.data,
    notifyOnChangeProps: "tracked",
  },
  halfhour: {
    cacheTime: 30 * 60 * 1000,
    staleTime: 30 * 60 * 1000,
    select: (data) => data.data.data,
    notifyOnChangeProps: "tracked",
  },
};
