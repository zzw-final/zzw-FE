import React from "react";
import styled from "styled-components";
import List from "../common/List";
import Tag from "../common/Tag";
import { useCookies } from "react-cookie";
import ListInfinite from "../common/ListInfinite";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Main = ({ tagList, bestPost, recentPost, followPost, likeToggle, search, mutate }) => {
  const onClickTagHandler = (tagName) => {
    search("tag", tagName);
  };

  const [cookies] = useCookies(["loginNickname"]);

  const loginNickname = cookies.loginNickname;

  return (
    <MainContainer>
      <TagsContainer>
        {tagList &&
          tagList?.map((tag, idx) => (
            <Tag
              tagName={tag.tagName}
              key={idx}
              isFoodName={true}
              onClickHandler={() => {
                onClickTagHandler(tag.tagName);
              }}
              margin="0 0.5rem 0 0.5rem"
              boxShadow="0px 2px 0px var(--color-dark-white)"
            />
          ))}
      </TagsContainer>
      <ListBox>
        <Title>
          🍕 베스트 레시피
          <ArrowSpan>
            <KeyboardArrowRightIcon />
          </ArrowSpan>
        </Title>
        <BestRecipeContainer>
          <List list={bestPost} likeToggle={likeToggle} height="200px" margin="0 0.5rem 0 0.5rem" />
        </BestRecipeContainer>
        {loginNickname === undefined ? (
          <>
            <Title>
              🍿 실시간 레시피
              <ArrowSpan>
                <KeyboardArrowDownIcon />
              </ArrowSpan>
            </Title>
            <NewRecipeScrollContainer>
              <ListInfinite listName="recentPost" likeToggle={likeToggle} />
            </NewRecipeScrollContainer>
          </>
        ) : (
          <>
            <Title>
              🍿 실시간 레시피
              <ArrowSpan>
                <KeyboardArrowRightIcon />
              </ArrowSpan>
            </Title>
            <NewRecipeContainer>
              <List list={recentPost} likeToggle={likeToggle} width="160px" height="200px" margin="0 0.5rem 0 0.5rem" />
            </NewRecipeContainer>
            <Title>
              🥕 팔로우 레시피
              <ArrowSpan>
                <KeyboardArrowDownIcon />
              </ArrowSpan>
            </Title>
            {loginNickname ? (
              <FollowContainer>
                <ListInfinite likeToggle={likeToggle} listName="followPost" />
              </FollowContainer>
            ) : (
              ""
            )}
          </>
        )}
      </ListBox>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  /* text-align: center; */
  padding-bottom: 95px;
`;

const TagsContainer = styled.section`
  display: flex;
  justify-content: center;
  padding: 0.8rem;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  font-size: var(--font-medium);
  margin: 1rem;
  font-weight: bold;
`;

const ArrowSpan = styled.span`
  display: flex;
  color: var(--color-real-light-orange);
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
  /* height: 40vh; */
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

const FollowContainer = styled.section``;

export default Main;
