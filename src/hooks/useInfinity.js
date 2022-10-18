import { useInfiniteQuery } from "react-query";

// useInfinity 훅은 3개 인자를 받습니다
// 쿼리 키(['mypage'] 같은 거), API 요청 함수(api 폴더에 있는 그거), 옵션(필요없으면 안쓰셔도됨, 캐시타임 스테일타임 등등)

const useInfinity = (queryKey, apiFn, option) => {
  // 저희 서버 API는 무한스크롤을 할 때 최초에는 API 주소로만 요청 보냈다가
  // 2번째 요청부터는 마지막 아이템의 postId를 같이 보내줘야 하기 때문에 여기서는 pageParam을 빈 값으로 둡니다
  const fetchData = ({ pageParam = "" }) => apiFn(pageParam);

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(queryKey, fetchData, {
    getNextPageParam: (lastPage, pages) => {
      // getNextPageParam은 API 요청에 쓰이는 pageParam을 리턴합니다(빈 값이었던 그거)
      // 첫 번째 인자로는 직전에 받아온 페이지를, 두 번째 인자로는 전체 페이지 배열을 반환해 줍니다
      // 저희는 직전 페이지에서 마지막 아이템의 postId를 추출해서 리턴해야겠쥬?
      // 여기서 undefined가 리턴되면 hasNextPage의 값이 false가 됩니다 (다음페이지가 없다는 뜻!)
      if (lastPage.data.data.length !== 0) {
        return lastPage.data.data === "" || lastPage.data.data.isLast
          ? undefined
          : lastPage.data.data.postList[lastPage.data.data.postList.length - 1].postId;
      } else {
        return "";
      }
    },

    // 기본 옵션으로 캐시/스테일타임 30분, data는 data.pages로 가공해 놓았는데
    // 이거 바꾸고 싶으시면 3번째 파라미터에 옵션 적어서 넘겨주세요

    cacheTime: 30 * 60 * 1000,
    staleTime: 30 * 60 * 1000,
    select: (data) => data.pages,
    notifyOnChangeProps: "tracked",
    ...option,
  });

  return { data, fetchNextPage, hasNextPage };

  // data: 받아와서 가공할 데이터 (주로 map을 돌리게 됩니다)
  // fetchNextPage: inView가 true가 되면 실행시킬 다음 페이지를 받아오는 함수
  // hasNextPage: getNextPageParams의 값을 참고해서 다음 페이지가 있는지 알려줌
};

export default useInfinity;
