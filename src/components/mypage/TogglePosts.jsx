import React from "react";
import Button from "../Button";
import styled from "styled-components";

function MyPosts() {
  return (
    //TODO: 무한스크롤 넣기
    <Container>
      <Button autoFocus="autoFocus" name="MyToggleBtn">
        내가 쓴 레시피 🥘
      </Button>
      <Button name="MyToggleBtn">내가 좋아한 레시피 🍳</Button>
    </Container>
  );
}

export default MyPosts;

const Container = styled.div`
  display: flex;
  margin: 0.7rem;
  gap: 0.5rem;
`;
