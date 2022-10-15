import { useInfiniteQuery } from "react-query";
import {
  fetchFollowListInfinite,
  fetchRecentListInfinite,
} from "../api/mainpage";

export const useInfiniteQueryScroll = (listName) => {
  const getPage = async ({ pageParam = "" }) => {
    const fetchSelect = (listName) => {
      switch (listName) {
        case "recentPost":
          return fetchRecentListInfinite(pageParam);
        case "followPost":
          return fetchFollowListInfinite(pageParam);
        default:
          throw new Error(`${listName} 은 찾을 수 없는 리스트입니다.`);
      }
    };
    const { data } = await fetchSelect(listName);
    const postList = data?.data.postList;
    return {
      postList: postList,
      lastPostId: postList[postList.length - 1]?.postId,
      isLast: postList.length < 6,
    };
  };

  const { data, isSuccess, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery(["mainPage", "infinite"], getPage, {
      getNextPageParam: ({ lastPostId, isLast }) => {
        return isLast ? false : lastPostId;
      },
      refetchOnWindowFocus: false,
    });

  return {
    data,
    isSuccess,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  };
};
