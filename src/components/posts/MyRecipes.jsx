import React from "react";
import Recipe from "./Recipe";
import styled from "styled-components";
import Button from "../UI/Button";
import { useNavigate } from "react-router-dom";

function MyRecipes({ myRecipes }) {
  const navigate = useNavigate();

  if (myRecipes?.length === 0) {
    return (
      <AlignBox>
        <Text>아직 레시피가 없어요!</Text>
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
