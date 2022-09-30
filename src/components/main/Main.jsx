import React, { useEffect } from "react";
import styled from "styled-components";
import List from "../common/List";
import Tag from "../common/Tag";
import Skeleton from "@mui/material/Skeleton";

const Main = ({
  bestPost,
  recentPost,
  tagList,
  followPost,
  likeToggle,
  search,
}) => {
  const onClickTagHandler = (tagName) => {
    search("tag", tagName);
  };

  return (
    <MainContainer>
      <TagsContainer>
        {tagList ? (
          tagList?.map((tag, idx) => (
            <Tag
              tagName={tag.tagName}
              key={idx}
              isFoodName={true}
              onClickHandler={() => {
                onClickTagHandler(tag.tagName);
              }}
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
        <Title>베스트 🍲</Title>
        <BestRecipeContainer>
          <List
            list={bestPost}
            likeToggle={likeToggle}
            width="160px"
            height="200px"
          />
        </BestRecipeContainer>
        {followPost && followPost.length === 0 ? (
          <>
            <Title>NEW 레시피 🥦</Title>
            <NewRecipeScrollContainer>
              <List
                list={recentPost}
                likeToggle={likeToggle}
                display="grid"
                height="210px"
                margin="0 0.5rem 0 0.5rem"
              />
            </NewRecipeScrollContainer>
          </>
        ) : (
          <>
            <Title>NEW 레시피 🥦</Title>
            <NewRecipeContainer>
              <List
                list={recentPost}
                likeToggle={likeToggle}
                width="160px"
                height="200px"
              />
            </NewRecipeContainer>
            <Title>follow List 🥕</Title>
            <FollowContainer>
              <List
                list={followPost}
                likeToggle={likeToggle}
                display="grid"
                height="210px"
                margin="0 0.5rem 0 0.5rem"
              />
            </FollowContainer>
          </>
        )}
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
  overflow-x: scroll;

  ::-webkit-scrollbar {
    height: 0.3rem;
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--color-orange);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: var(--color-white);
    /* background-color: var(--color-light-orange); */
  }
`;

const NewRecipeScrollContainer = styled.section`
  height: 110vh;
`;

const NewRecipeContainer = styled.section`
  overflow-x: scroll;
  overflow-y: auto;

  ::-webkit-scrollbar {
    height: 0.3rem;
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--color-orange);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: var(--color-white);
  }
`;

const FollowContainer = styled.section`
  display: flex;
`;

export default Main;
