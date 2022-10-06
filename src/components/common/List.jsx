import React from "react";
import RecipeBest from "../posts/RecipeBest";
import styled from "styled-components";
import Skeleton from "@mui/material/Skeleton";
import Card from "../UI/Card";

const List = ({ list, likeToggle, mutate, ...props }) => {
  return (
    <ListContainer {...props}>
      {list ? (
        list?.map((item) => (
          <RecipeBest
            post={item}
            key={item.postId}
            likeToggle={likeToggle}
            mutate={mutate}
            {...props}
          />
        ))
      ) : (
        // 3번 반복
        <Card width="160px" height="200px" margin="1px 6px">
          <Skeleton
            variant="rectangular"
            width={160}
            height={200}
            sx={{ borderRadius: "15px" }}
          />
        </Card>
      )}
    </ListContainer>
  );
};

const ListContainer = styled.section`
  display: ${(props) => props.display || "flex"};
  grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
  grid-row-gap: 1rem;
  justify-items: center;
  /* height: 220px; */
  margin: ${(props) => props.margin};
`;

export default List;
