import Recipe from "./Recipe";
import styled from "styled-components";

function LikeRecipes({ likeRecipes, recipeRef }) {
  if (likeRecipes?.length === 0) {
    return (
      <AlignBox>
        <Text>좋아요 누르고 함께 요리해요!</Text>
      </AlignBox>
    );
  }

  return (
    <Container>
      {likeRecipes?.map((likeRecipe) =>
        likeRecipe?.data.data.postList.map((recipe) => (
          <Recipe recipeRef={recipeRef} key={recipe.postId} post={recipe} />
        ))
      )}
    </Container>
  );
}

export default LikeRecipes;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
  margin-bottom: 90px;
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
