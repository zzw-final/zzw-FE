import React from "react";
import Button from "../UI/Button";
import styled from "styled-components";

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
