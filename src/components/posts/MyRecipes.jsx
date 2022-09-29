import React from "react";
import Recipe from "./Recipe";
import styled from "styled-components";
import Button from "../UI/Button";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../util/cookie";

function MyRecipes({ myRecipes, userNickname }) {
  const navigate = useNavigate();
  const nickname = getCookie("loginNickname");

  if (myRecipes?.length === 0 && userNickname === undefined) {
    return (
      <AlignBox>
        <Text>버튼을 눌러 레시피를 작성해보세요!</Text>
        <Button
          onClick={() => {
            navigate("/write");
          }}
          name="EmptyBtn"
        >
          레시피 작성하기
        </Button>
      </AlignBox>
    );
  }

  if (myRecipes?.length === 0 && nickname !== userNickname) {
    return (
      <AlignBox>
        <Text>{userNickname}님은 아직 레시피가 없으시네요.</Text>
      </AlignBox>
    );
  }

  return (
    <Container>
      {myRecipes?.map((myRecipe) => (
        <Recipe key={myRecipe.postId} post={myRecipe}></Recipe>
      ))}
    </Container>
  );
}

export default MyRecipes;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
`;

const AlignBox = styled.div`
  position: relative;
  text-align: center;
  margin: 10rem 0;
`;

const Text = styled.div`
  font-size: var(--font-medium);
  padding: 1rem;
  color: grey;
`;
