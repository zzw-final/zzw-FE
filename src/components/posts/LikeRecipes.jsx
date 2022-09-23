import React from "react";
import Recipe from "./Recipe";
import styled from "styled-components";

function LikeRecipes({ likeRecipes }) {
  return (
    <Container>
      {likeRecipes?.map((likeRecipe) => (
        <Recipe key={likeRecipe.postId} post={likeRecipe}></Recipe>
      ))}
    </Container>
  );
}

export default LikeRecipes;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
`;
