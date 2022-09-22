import React from "react";
import styled from "styled-components";
import Tag from "../common/Tag";
import { likeRecipe } from "../../api/request";

function RecipeBest({ post }) {
  const { postId, title, nickname, likeNum, ingredient, foodImg, createAt } =
    post;

  const foodName = ingredient?.find(
    (ingredient) => ingredient.isName === true
  ).ingredientName;

  const foodIngredientList = ingredient
    ?.map((ingredient) =>
      ingredient.isName !== true ? ingredient.ingredientName : undefined
    )
    .filter((ingredient) => ingredient !== undefined);

  console.log("likeNum :>> ", likeNum);

  const toggleLike = () => {
    likeRecipe(postId);
  };

  const delBtnClick = () => {
    alert("click!");
  };

  return (
    <PostBox>
      <TopBox>
        <div style={{ fontSize: `var(--font-small)` }}>
          <Tag
            tagName={`#${foodName}`}
            isFoodName={true}
            idDelBtn={true}
            delBtnClick={delBtnClick}
          />
        </div>
        <div style={{ fontSize: `11px` }} onClick={toggleLike}>
          🥄{likeNum}
        </div>
      </TopBox>
      <img alt="foodphoto" width="100%" height="60%" src={foodImg} />
      <Title>{title}</Title>
      <Tags>
        {foodIngredientList.map((ingredient, idx) => (
          <Tag tagName={ingredient} key={idx} />
        ))}
      </Tags>
    </PostBox>
  );
}

export default RecipeBest;

const PostBox = styled.div`
  max-width: 220px;
  width: 150px;
  height: 220px;
  background-color: var(--color-light-white);
  box-shadow: 3px 3px 5px #dcdcdc;
  cursor: pointer;
  margin-right: 10px;
`;

const TopBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0.5rem;
`;

const Title = styled.div`
  padding: 0.1rem 0.3rem;
  font-weight: var(--weight-semi-bold);
  margin: 0.2rem 0.2rem;

  //DESC: width 넘어가면 ...으로 생략되는 부분
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Tags = styled.div`
  display: flex;
  padding: 0.2rem;
  gap: 0.15rem;
  overflow: auto;
  white-space: nowrap;

  &::-webkit-scrollbar {
    display: none;
  }
`;
