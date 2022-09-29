import React from "react";
import styled from "styled-components";
import List from "../common/List";
import Tag from "../common/Tag";
import Skeleton from "@mui/material/Skeleton";

const MainSearch = ({ tagList, searchResultList, likeToggle }) => {
  return (
    <MainContainer>
      <TagsContainer>
        {tagList ? (
          tagList?.map((tag, idx) => (
            <Tag
              tagName={tag.tagName}
              key={idx}
              isFoodName={true}
              margin="0 0.5rem 0 0.5rem"
              boxShadow="0px 2px 0px #868686"
            />
          ))
        ) : (
          // 4번 반복
          <Skeleton
            variant="rounded"
            width={50}
            height={19}
            sx={{ marginLeft: 1, marginRight: 1 }}
          />
        )}
      </TagsContainer>
      <ListBox>
        <Title>검색 결과</Title>
        <BestRecipeContainer>
          <List list={searchResultList} likeToggle={likeToggle} />
        </BestRecipeContainer>
      </ListBox>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  /* text-align: center; */
`;

const TagsContainer = styled.section`
  display: flex;
  justify-content: center;
  padding: 0.6rem;
`;

const Title = styled.div`
  font-size: var(--font-medium);
  margin: 1rem;
  font-weight: bold;
`;

const ListBox = styled.div`
  background-color: var(--color-white);
  border-radius: 1.5rem 1.5rem 0 0;
  padding-top: 0.4rem;
`;

const BestRecipeContainer = styled.section`
  /* height: 100vh; */
  /* background-color: lavender; */
`;

export default MainSearch;
