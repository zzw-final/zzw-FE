import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Tag from "../common/Tag";
import { useNavigate } from "react-router-dom";
import Card from "../UI/Card";
import Like from "../common/Like";
import { useCookies } from "react-cookie";
import Skeleton from "@mui/material/Skeleton";

function RecipeBest({ post, likeToggle, mutate, ...props }) {
  const { postId, title, isLike, ingredient, foodImg } = post;
  const [likeToggleBtn, setLikeToggleBtn] = useState(isLike);
  const navigate = useNavigate();
  const [cookies] = useCookies(["loginNickname"]);
  const loginNickname = cookies.loginNickname;

  const foodName = ingredient?.find(
    (ingredient) => ingredient.isName === true
  ).ingredientName;

  const foodIngredientList = ingredient
    ?.map((ingredient) =>
      ingredient.isName !== true ? ingredient.ingredientName : undefined
    )
    .filter((ingredient) => ingredient !== undefined);

  const goToDetail = () => {
    navigate(`/detail/${postId}`);
  };

  const like = async () => {
    if (loginNickname === undefined) {
      alert("로그인 유저만 사용 가능한 기능입니다.");
      return;
    }
    await likeToggle(postId);
    // mutate(postId);
    setLikeToggleBtn(!likeToggleBtn);
  };

  return (
    <Card {...props} margin="1px 6px">
      <TopBox>
        <Tag
          tagName={`#${foodName}`}
          isFoodName={true}
          height="24px"
          opacity={0.8}
        />
        <Like isLike={likeToggleBtn} btnClick={like} />
      </TopBox>
      <Img alt="foodphoto" src={foodImg} onClick={goToDetail}></Img>
      <Title>{title}</Title>
      <Tags>
        {foodIngredientList.map((ingredient, idx) => (
          <Tag tagName={ingredient} key={idx} />
        ))}
      </Tags>
    </Card>
  );
}

export default RecipeBest;

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
  font-weight: var(--weight-semi-bold);
  margin: 0.2rem 0.2rem;
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
