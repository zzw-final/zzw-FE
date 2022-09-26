import React from "react";
import Recipe from "./Recipe";
import styled from "styled-components";

function LikeRecipes({ likeRecipes, setLikeRecipes }) {
  // const cancelLike = (postId) => {
  //   setLikeRecipes(likeRecipes?.filter((list) => list.id !== postId));
  // };

  return (
    <Container>
      {likeRecipes?.map((likeRecipe) => (
        <Recipe key={likeRecipe.postId} post={likeRecipe} />
      ))}
    </Container>
  );
}

export default LikeRecipes;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
`;
