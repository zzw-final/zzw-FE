import React from "react";
import RecipeBest from "./RecipeBest";
import Recipe from "./Recipe";
import styled from "styled-components";

function MyRecipes({ myRecipes }) {
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
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
