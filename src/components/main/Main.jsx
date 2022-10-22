import React from "react";
import styled from "styled-components";
import List from "../common/List";
import Tag from "../common/Tag";
import ListInfinite from "../common/ListInfinite";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { getCookie } from "../../util/cookie";

const Main = ({ tagList, bestPost, recentPost, search }) => {
  const loginNickname = getCookie("loginNickname");

  const onClickTagHandler = (tagName) => {
    search("tag", tagName);
  };

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
        <section>
          <List list={bestPost} height="200px" margin="0 0.5rem 0 0.5rem" />
        </section>
        {!loginNickname ? (
          <>
            <Title>
              🍿 실시간 레시피
              <ArrowSpan>
                <KeyboardArrowDownIcon />
              </ArrowSpan>
            </Title>
            <section>
              <ListInfinite listName="recentPost" />
            </section>
          </>
        ) : (
          <>
            <Title>
              🍿 실시간 레시피
              <ArrowSpan>
                <KeyboardArrowRightIcon />
              </ArrowSpan>
            </Title>
            <section>
              <List list={recentPost} width="160px" height="200px" margin="0 0.5rem 0 0.5rem" />
            </section>
            <Title>
              🥕 팔로우 레시피
              <ArrowSpan>
                <KeyboardArrowDownIcon />
              </ArrowSpan>
            </Title>
            {loginNickname && (
              <section>
                <ListInfinite listName="followPost" />
              </section>
            )}
          </>
        )}
      </ListBox>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  margin-bottom: 60px;
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

export default Main;
