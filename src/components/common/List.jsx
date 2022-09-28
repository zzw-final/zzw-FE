import React from "react";
import RecipeBest from "../posts/RecipeBest";
import styled from "styled-components";
import Skeleton from "@mui/material/Skeleton";
import Card from "../UI/Card";

const List = ({ list, likeToggle }) => {
  return (
    <ListContainer>
      {list ? (
        list?.map((item) => (
          <RecipeBest post={item} key={item.postId} likeToggle={likeToggle} />
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
  display: flex;
  height: 220px;
  margin-left: 0.5rem;
`;

export default List;
