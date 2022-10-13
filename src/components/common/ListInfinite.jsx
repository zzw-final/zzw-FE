import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Recipe from "../posts/Recipe";
import { useInView } from "react-intersection-observer";
import { useInfiniteQueryScroll } from "../../hooks/useInfiniteQueryScroll";
import { useRef } from "react";

const ListInfinite = ({ list, likeToggle, listName, ...props }) => {
  const [isLastFromServer, setIsLastFromServer] = useState("false");

  const { data, isSuccess, hasNextPage, fetchNextPage } =
    useInfiniteQueryScroll(listName, isLastFromServer || "");
  const { ref, inView } = useInView();

  useEffect(() => {
    setIsLastFromServer(
      data?.pages[data?.pages?.length - 1].isLastFromServer + ""
    );
  }, [data]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, listName]);

  return (
    <ListContainer {...props}>
      {isSuccess && data.pages
        ? data.pages.map((page, pageIndex) => {
            const list = page.postList;
            return list.map((item, itemIdx) => {
              if (
                data.pages.length === pageIndex + 1 &&
                list.length === itemIdx + 1
              ) {
                return (
                  <div ref={ref} key={item.postId}>
                    <Recipe post={item} likeToggle={likeToggle} {...props} />
                  </div>
                );
              } else {
                return (
                  <Recipe
                    post={item}
                    key={item.postId}
                    likeToggle={likeToggle}
                    {...props}
                  />
                );
              }
            });
          })
        : null}
      {/* {list &&
        list.postList?.map((item, itemIdx) => {
          if (itemIdx !== 5) {
            return (
              <Recipe
                post={item}
                key={item.postId}
                likeToggle={likeToggle}
                {...props}
              />
            );
          } else {
            return (
              <div ref={ref} key={item.postId}>
                <Recipe post={item} likeToggle={likeToggle} {...props} />
              </div>
            );
          }
        })} */}
    </ListContainer>
  );
};

const ListContainer = styled.section`
  display: ${(props) => props.display || "flex"};
  grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
  grid-row-gap: 1rem;
  justify-items: center;
  margin: ${(props) => props.margin};
`;

export default ListInfinite;
