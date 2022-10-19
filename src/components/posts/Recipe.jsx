import styled from "styled-components";
import Tag from "../common/Tag";
import Card from "../UI/Card";
import Like from "../common/Like";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Recipe({ post, recipeRef, ...props }) {
  const navigate = useNavigate();
  const { postId, title, ingredient, foodImg } = post;

  const foodName = ingredient?.find((ingredient) => ingredient.isName === true).ingredientName;

  const foodIngredientList = ingredient
    ?.map((ingredient) => (ingredient.isName !== true ? ingredient.ingredientName : undefined))
    .filter((ingredient) => ingredient !== undefined);

  const goToDetail = () => {
    navigate(`/detail/${postId}`);
  };

  return (
    <Card {...props} margin="3px 6px">
      <TopBox>
        <Tag tagName={`#${foodName}`} isFoodName={true} height="24px" opacity={0.8} />
      </TopBox>
      <Img alt="foodphoto" src={foodImg} onClick={goToDetail} />
      <Title ref={recipeRef}>{title}</Title>
      <Tags>
        {foodIngredientList?.map((ingredient, idx) => (
          <Tag tagName={ingredient} key={idx} />
        ))}
      </Tags>
    </Card>
  );
}

export default Recipe;

const TopBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: absolute;
  padding: 0.4rem 0.5rem;
`;

const Img = styled.img`
  width: 100%;
  height: 70%;
  border-radius: 15px;
  padding: 0.1rem;
`;

const Title = styled.div`
  padding: 0.1rem 0.3rem;
  margin: 0.2rem 0.2rem;
  font-size: var(--font-regular);
  font-weight: var(--weight-regular-thick);
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
