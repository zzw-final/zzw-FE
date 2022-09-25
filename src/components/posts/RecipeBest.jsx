import React, { useEffect } from "react";
import styled from "styled-components";
import Tag from "../common/Tag";
import { likeRecipe, getLikeRecipe } from "../../api/request";
import { useNavigate } from "react-router-dom";

function RecipeBest({ post }) {
  const { postId, title, nickname, likeNum, ingredient, foodImg, createAt } =
    post;

  const navigate = useNavigate();

  const foodName = ingredient?.find(
    (ingredient) => ingredient.isName === true
  ).ingredientName;

  const foodIngredientList = ingredient
    ?.map((ingredient) =>
      ingredient.isName !== true ? ingredient.ingredientName : undefined
    )
    .filter((ingredient) => ingredient !== undefined);

  const toggleLike = () => {
    likeRecipe(postId).then((res) => console.log("res > ", res));
  };

  // useEffect(() => {
  //   getLikeRecipe();
  // }, []);

  // useEffect(() => {
  //   async function fetchData() {
  //     const result = await getLikeRecipe();
  //     if (result.data.success && result.data.error === null) {
  //       console.log("cccc >", result.data);
  //       console.log("cccc >", result.data.data[0].postId);
  //     }
  //   }
  //   fetchData();
  // }, []);

  const goToDetail = () => {
    navigate(`/detail/${postId}`);
  };

  return (
    <PostBox>
      <TopBox>
        <div style={{ fontSize: `var(--font-small)` }}>
          <Tag tagName={`#${foodName}`} isFoodName={true} />
        </div>
        <div style={{ fontSize: `11px` }} onClick={toggleLike}>
          ❤️ ♡{likeNum}
        </div>
      </TopBox>
      <img
        alt="foodphoto"
        width="100%"
        height="60%"
        src={foodImg}
        onClick={goToDetail}
      />
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
