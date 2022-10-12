import styled from "styled-components";
import Tag from "../common/Tag";
import Card from "../UI/Card";
import Like from "../common/Like";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { likes } from "../../api/request";

function Recipe({ post, ...props }) {
  const navigate = useNavigate();
  const { postId, title, isLike, ingredient, foodImg } = post;
  const [likeToggleBtn, setLikeToggleBtn] = useState(isLike);
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

  const like = async () => {
    if (loginNickname === undefined) {
      alert("로그인 유저만 사용 가능한 기능입니다.");
      return;
    }
    const resp = await likes(postId);
    const isVisible = resp.data.data;
    if (isVisible) {
      setLikeToggleBtn(!likeToggleBtn);
    }
  };

  const goToDetail = () => {
    navigate(`/detail/${postId}`);
  };

  return (
    <Card {...props} margin="1px 6px">
      <TopBox>
        <Tag tagName={`#${foodName}`} isFoodName={true} height="24px" opacity={0.8} />
        <Like isLike={likeToggleBtn} btnClick={like} />
      </TopBox>
      <Img alt="foodphoto" src={foodImg} onClick={goToDetail} />
      <Title>{title}</Title>
      <Tags>
        {foodIngredientList.map((ingredient, idx) => (
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

// import React from "react";
// import styled from "styled-components";

// function Recipe({ myRecipe }) {
//   const foodName = myRecipe?.ingredient.filter((title) => title.isName === true);
//   const tags = myRecipe?.ingredient.filter((title) => title.isName === false);

//   return (
//     <Container>
//       <PostBox>
//         <TopBox>
//           <div style={{ fontSize: `var(--font-small)` }}>
//             #{foodName[0].ingredientName}
//           </div>
//           <div style={{ fontSize: `11px` }}>🥄{myRecipe?.likeNum}</div>
//         </TopBox>
//         <img alt="foodImg" width="100%" height="60%" src={myRecipe?.foodImg} />
//         <Title>{myRecipe?.title}</Title>
//         <Tags>
//           {tags?.map((tag, i) => (
//             <Tag key={i}>#{tag.ingredientName}</Tag>
//           ))}
//           <Tag>#양지</Tag>
//           <Tag>#숙주나물</Tag>
//           <Tag>#레몬</Tag>
//         </Tags>
//       </PostBox>
//     </Container>
//   );
// }

// export default Recipe;

// const Container = styled.div`
//   display: flex;
//   justify-content: space-evenly;
//   margin-top: 15px;
// `;

// const PostBox = styled.div`
//   max-width: 220px;
//   width: 45%;
//   height: 30vh;
//   background-color: var(--color-light-white);
//   box-shadow: 3px 3px 5px #dcdcdc;
// `;

// const TopBox = styled.div`
//   display: flex;
//   justify-content: space-between;
//   padding: 0.5rem 0.5rem;
// `;

// const Title = styled.div`
//   padding: 0.1rem 0.3rem;
//   font-weight: var(--weight-semi-bold);
//   margin: 0.2rem 0.2rem;

//   //DESC: width 넘어가면 ...으로 생략되는 부분
//   width: 100%;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   white-space: nowrap;
// `;

// const Tags = styled.div`
//   display: flex;
//   padding: 0.2rem;
//   gap: 0.15rem;
//   overflow: auto;
//   white-space: nowrap;

//   &::-webkit-scrollbar {
//     display: none;
//   }
// `;

// const Tag = styled.p`
//   font-size: var(--font-small);
//   background-color: var(--color-primary-green);
//   padding: 0.1rem 0.3rem;
//   border-radius: 20px;
// `;
