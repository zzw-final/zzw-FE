import React from "react";
// import Button from "../Button";
import styled, { css } from "styled-components";

function TogglePosts({
  onClickLikeRecipe,
  onClickRecipeHandler,
  myVisible,
  likeVisible,
}) {
  return (
    //TODO: 무한스크롤 넣기
    <Container>
      <Button onClick={onClickRecipeHandler} myVisible={myVisible} name="MyToggleBtn">
        내가 쓴 레시피 🥘
      </Button>
      <Button onClick={onClickLikeRecipe} likeVisible={likeVisible} name="MyToggleBtn">
        내가 좋아한 레시피 🍳
      </Button>
    </Container>
  );
}

export default TogglePosts;

const Container = styled.div`
  display: flex;
  margin: 0.7rem;
  gap: 0.5rem;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2.5px solid var(--color-light-white);
  border-radius: 20px;
  background-color: transparent;
  padding: 0px 0.6rem;
  font-weight: var(--weight-semi-bold);
  font-size: var(--font-midium);
  cursor: pointer;

  ${({ myVisible }) =>
    myVisible &&
    css`
      background-color: var(--color-orange);
      font-weight: var(--weight-bolder);
      color: var(--color-white);
      border: 2.5px solid transparent;
      outline: none;
    `}

  ${({ likeVisible }) =>
    likeVisible &&
    css`
      background-color: var(--color-pink);
      font-weight: var(--weight-bolder);
      color: var(--color-white);
      border: 2.5px solid transparent;
      outline: none;
    `}
`;
