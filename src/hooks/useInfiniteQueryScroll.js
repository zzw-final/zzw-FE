import { useInfiniteQuery } from "react-query";
import {
  fetchFollowListInfinite,
  fetchRecentListInfinite,
} from "../api/mainpage";

export const useInfiniteQueryScroll = (listName, isLastFromServer) => {
  const getPage = async ({ pageParam = "" }) => {
    const fetchSelect = (listName) => {
      switch (listName) {
        case "recentPost":
          return fetchRecentListInfinite(pageParam, isLastFromServer);
        case "followPost":
          return fetchFollowListInfinite(pageParam, isLastFromServer);
        default:
          throw new Error(`${listName} 은 찾을 수 없는 리스트입니다.`);
      }
    };
    const { data } = await fetchSelect(listName);
    const postList = data?.data.postList;
    const getIsLast = data?.data.isLast;

    // console.log("postList :>> ", postList);
    // console.log("isLastFromServer :>> ", isLastFromServer);
    // console.log("isLast :>> ", data.data.isLast);

    return {
      postList: postList,
      lastPostId: postList[postList.length - 1].postId,
      isLast: postList.length < 6,
      isLastFromServer: getIsLast,
    };
  };

  const { data, isSuccess, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery(["recentPostInfinite"], getPage, {
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
