import React from "react";
import Button from "../UI/Button";
import styled from "styled-components";

function TogglePosts({ onClickLikeRecipe, onClickMyRecipe, myVisible, likeVisible }) {
  return (
    //TODO: 무한스크롤 넣기
    <Container>
      <Button
        onClick={onClickMyRecipe}
        myVisible={myVisible}
        width="20rem"
        height="2rem"
        name="ProfileBtn"
      >
        <span style={{ fontSize: "15px" }}>✏️</span> 내가 작성한 레시피
      </Button>
      <Button
        onClick={onClickLikeRecipe}
        likeVisible={likeVisible}
        width="23rem"
        height="2rem"
        name="ProfileBtn"
      >
        <span style={{ fontSize: "15px" }}>💘</span> 내가 좋아요한 레시피
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
