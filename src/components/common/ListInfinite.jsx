import React, { useEffect } from "react";
import styled from "styled-components";
import Recipe from "../posts/Recipe";
import { useInView } from "react-intersection-observer";
import useInfinity from "../../hooks/useInfinity";
import { fetchFollowListInfinite, fetchRecentListInfinite } from "../../api/mainpage";

const ListInfinite = ({ listName, resultSearch, ...props }) => {
  const { ref, inView } = useInView();
  let api;

  switch (listName) {
    case "recentPost":
      api = fetchRecentListInfinite;
      break;
    case "followPost":
      api = fetchFollowListInfinite;
      break;
    default:
      throw new Error(`${listName} 는 조회 가능한 리스트가 아닙니다.`);
  }

  const { data, fetchNextPage, hasNextPage } = useInfinity(["mainPage", "infinite"], api);

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <ListContainer {...props}>
      {data?.map((item, pageIndex) => {
        const list = item.data.data.postList;
        if (!list)
          return (
            <SearchListText key={pageIndex}>😊 관심 있는 유저를 팔로우 해주세요!</SearchListText>
          );
        return list?.map((item, itemIdx) => {
          if (data.length === pageIndex + 1 && list.length === itemIdx + 1) {
            return (
              <div ref={ref} key={item.postId}>
                <Recipe post={item} {...props} />
              </div>
            );
          } else {
            return <Recipe post={item} key={item.postId} {...props} />;
          }
        });
      })}
    </ListContainer>
  );
};

const ListContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
  grid-row-gap: 1rem;
  justify-items: center;
  margin: 0 0.5rem 1.6rem 0.5rem;
  position: relative;
`;

const SearchListText = styled.p`
  font-size: var(--font-regular);
  color: var(--color-grey);
  text-align: center;
  margin-bottom: 1.4rem;
  position: absolute;
`;

export default ListInfinite;
