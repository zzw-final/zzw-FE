import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { instance } from "../../api/request";
import Tag from "../common/Tag";

function Detail() {
  const postId = useParams().id;
  const [postDetail, setPostDetail] = useState();
  const [tagList, setTagList] = useState();

  const getData = async () => {
    const data = await instance.get(`/api/post/${postId}`);
    console.log("get요청", data);
    if (data.data.success && data.data.error === null) {
      setPostDetail(data.data.data);
      setTagList(data.data.data.ingredient);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  console.log("디테일정보값", postDetail);

  const { title, nickname, likeNum, ingredient, foodImg, createAt, content } =
    postDetail;

  console.log("제목", title);

  const foodName = ingredient?.find(
    (ingredient) => ingredient.isName === true
  ).ingredientName;

  const foodIngredientList = ingredient
    ?.map((ingredient) =>
      ingredient.isName !== true ? ingredient.ingredientName : undefined
    )
    .filter((ingredient) => ingredient !== undefined);

  return (
    <DetailContainer>
      <ButtonDiv>
        <button>수정</button>
        <button>삭제</button>
      </ButtonDiv>
      <TitleDiv>
        <FoodnameDiv>{foodName}</FoodnameDiv>
        <PostTitleDiv>
          <NickNameDiv>{nickname}</NickNameDiv>
          <PostTitle>{title}</PostTitle>

          <Tags>
            {foodIngredientList.map((ingredient, idx) => (
              <Tag tagName={ingredient} key={idx} />
            ))}
          </Tags>
        </PostTitleDiv>
      </TitleDiv>
      <FoodImgBox>
        <img scr={foodImg} />
      </FoodImgBox>

      <LikeDiv>
        <CreatDate>{createAt}</CreatDate>
        <Like>
          조아요<Likenumdiv>{likeNum}</Likenumdiv>
        </Like>
      </LikeDiv>
      <ContentBox>{content}</ContentBox>
    </DetailContainer>
  );
}

export default Detail;

const DetailContainer = styled.div`
  /* background-color: green; */
  height: 70vh;
  width: 100vw;
`;

const TitleDiv = styled.div`
  /* background-color: white; */
  height: 10vh;
  width: 100%;
  /* display: inline-flex; */
`;

const ButtonDiv = styled.div`
  /* background-color: red; */
  text-align: right;
  width: 100vw;
  height: 4vh;
  margin-top: 3vh;
  padding: 3vw 3vh;
`;

const FoodnameDiv = styled.div`
  /* background-color: pink; */
  width: 100vw;
  height: 4vh;
  padding-top: 1vh;
  font-size: var(--font-regular);
  text-align: center;
`;

const PostTitleDiv = styled.div`
  justify-content: space-between;
`;

const PostTitle = styled.div`
  /* background-color: blue; */

  height: 4vh;
  font-size: var(--font-small);
  padding: 2vw 4vh;
`;

const NickNameDiv = styled.div`
  /* background-color: skyblue; */
  color: var(--color-grey);
  padding: 0vh 10vw;
  font-size: var(--font-micro);
  text-align: right;
`;

const FoodImgBox = styled.div`
  margin: auto;
  margin-top: 8vw;
  width: 60vw;
  height: 20vh;
  background-color: skyblue;
  border-radius: 10px;
`;

const LikeDiv = styled.div`
  display: grid;
  grid-template-columns: 150px 1fr 1fr;
`;

const Like = styled.div`
  /* background-color: yellow; */
  width: 20vw;
  grid-column-start: 4;
  display: grid;
  grid-template-columns: 4fr 3fr;
  /* margin-right: 1rem;
  margin-top: 1rem; */
  margin: 1rem 1rem 0.5rem 2rem;
  font-size: var(--font-micro);
`;

const Likenumdiv = styled.div`
  /* background-color: #e8f5e9; */
  width: 5vw;
  font-size: var(--font-micro);
`;

const CreatDate = styled.div`
  width: 35vw;
  font-size: var(--font-micro);
  /* background-color: green; */
  grid-column: 1 / span 3;
  margin-left: 2rem;
  margin-top: 1rem;
`;

const ContentBox = styled.div`
  box-sizing: border-box;
  border: 1px solid #a8a8a8;
  /* height: 30vh; */
  padding: 5vw;
  margin: 2vw;
  border-radius: 10px;
  font-size: var(--font-small);
`;
const Tags = styled.div`
  margin-left: 1rem;
  display: flex;
  padding: 0.2rem;
  gap: 0.15rem;
  overflow: auto;
  white-space: nowrap;

  &::-webkit-scrollbar {
    display: none;
  }
`;
