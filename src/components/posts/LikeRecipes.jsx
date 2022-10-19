import Recipe from "./Recipe";
import styled from "styled-components";

function LikeRecipes({ likeRecipes, recipeRef }) {
  if (!likeRecipes || !likeRecipes[0].data.success) {
    return <Text>아직 좋아요한 레시피가 없어요! 💔</Text>;
  }

  return (
    <Container>
      {likeRecipes[0]?.data.data &&
        likeRecipes?.map((likeRecipe) =>
          likeRecipe?.data.data.postList.map((recipe) => (
            <Recipe key={recipe.postId} recipeRef={recipeRef} post={recipe} />
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

const Text = styled.div`
  margin-top: 150px;
  text-align: center;
  font-size: var(--font-medium);
  width: 100%;
  color: grey;
`;
