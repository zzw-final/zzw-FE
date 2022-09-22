import React from "react";
import Recipe from "./Recipe";

function MyRecipes({ myRecipes }) {
  return (
    <>
      {myRecipes?.map((myRecipe) => (
        <Recipe key={myRecipe.postId} myRecipe={myRecipe}></Recipe>
      ))}
    </>
  );
}

export default MyRecipes;
