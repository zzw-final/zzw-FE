import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Tag from "../common/Tag";
import { likeRecipe, getLikeRecipeList } from "../../api/request";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function RecipeBest({ post }) {
  const { postId, title, nickname, likeNum, ingredient, foodImg, createAt } =
    post;
  const [likeList, setLikeList] = useState([]);
  const [likeItem, setLikeItem] = useState(false);
  const [cookies] = useCookies(["loginEmail"]);
  const imgRef = useRef();
  const loginNickname = cookies.loginNickname;

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
    if (loginNickname === undefined) {
      alert("로그인 유저만 이용할 수 있는 서비스 입니다.");
      return;
    }
    likeRecipe(postId).then((res) =>
      res.data.data === "post like success"
        ? setLikeItem(true)
        : setLikeItem(false)
    );
  };

  useEffect(() => {
    async function fetchData() {
      const result = await getLikeRecipeList();
      if (result.data.success && result.data.error === null) {
        setLikeList(result.data.data);
      }
    }
    if (loginNickname !== undefined) {
      fetchData();
    }
  }, [loginNickname]);

  useEffect(() => {
    const check = likeList.find((item) => item.postId === postId);
    if (check) {
      setLikeItem(true);
    }
  }, [likeList, postId]);

  const goToDetail = () => {
    navigate(`/detail/${postId}`);
  };

  console.log("likeList :>> ", likeList);

  // useEffect(() => {
  //   imgRef?.current.addEventListener("dblclick", toggleLike());
  //   return imgRef?.current.removeEventListener("dblclick", () => {});
  // }, [imgRef]);

  return (
    <PostBox>
      <TopBox>
        <div style={{ fontSize: `var(--font-small)` }}>
          <Tag tagName={`#${foodName}`} isFoodName={true} />
        </div>
        <div style={{ fontSize: `11px` }} onClick={toggleLike}>
          {likeItem ? "❤️" : "♡"}
        </div>
      </TopBox>
      <img
        alt="foodphoto"
        width="100%"
        height="60%"
        src={foodImg}
        onClick={goToDetail}
        // ref={imgRef}
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
