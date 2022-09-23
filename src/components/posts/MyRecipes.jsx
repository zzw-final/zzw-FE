import React from "react";
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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
`;
