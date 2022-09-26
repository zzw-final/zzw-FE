import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { instance } from "../../api/request";
import Tag from "../common/Tag";
import CommentList from "../comment/CommentList";

function Detail({ postDetail, onDelete }) {
  const foodName = postDetail?.ingredient?.find(
    (ingredient) => ingredient.isName === true
  ).ingredientName;

  const foodIngredientList = postDetail?.ingredient
    ?.map((ingredient) =>
      ingredient.isName !== true ? ingredient.ingredientName : undefined
    )
    .filter((ingredient) => ingredient !== undefined);

  // export const deleteComment = async (commentId) => {
  //   const res = await instance.delete(`/api/auth/post/comment/${commentId}`);
  //   return res.data.success ? commentId : res.data.error;

  //   async function remove(commentId) {
  //     const deletedCommentId = await deleteComment(commentId);
  //     setCommentList((prev) =>
  //       prev.filter((comment) => comment.commentId !== deletedCommentId)
  //     );
  //   }

  return (
    <>
      <DetailContainer>
        <ButtonDiv>
          <button>수정</button>
          <button onClick={onDelete}>삭제</button>
        </ButtonDiv>
        <TitleDiv>
          <FoodnameDiv>{foodName}</FoodnameDiv>
          <PostTitleDiv>
            <NickNameDiv>{postDetail?.nickname}</NickNameDiv>
            <PostTitle>{postDetail?.title}</PostTitle>

            <Tags>
              {foodIngredientList?.map((ingredient, idx) => (
                <Tag tagName={ingredient} key={idx} />
              ))}
            </Tags>
          </PostTitleDiv>
        </TitleDiv>
        <FoodImgBox>
          <img
            alt="foodphoto"
            width="100%"
            height="60%"
            scr={postDetail?.foodImg}
          />
        </FoodImgBox>

        <LikeDiv>
          <CreatDate>{postDetail?.createAt}</CreatDate>
          <Like>
            조아요<Likenumdiv>{postDetail?.likeNum}</Likenumdiv>
          </Like>
        </LikeDiv>
        <ContentBox>{postDetail?.content}</ContentBox>
      </DetailContainer>
      <CommentList postId={postDetail?.postId} />
    </>
  );
}

export default Detail;

const DetailContainer = styled.div`
  height: 70vh;
  width: 100vw;
`;

const TitleDiv = styled.div`
  height: 10vh;
  width: 100%;
`;

const ButtonDiv = styled.div`
  text-align: right;
  width: 100vw;
  height: 4vh;
  margin-top: 3vh;
  padding: 3vw 3vh;
`;

const FoodnameDiv = styled.div`
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
  height: 4vh;
  font-size: var(--font-small);
  padding: 2vw 4vh;
`;

const NickNameDiv = styled.div`
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

  border-radius: 10px;
`;

const LikeDiv = styled.div`
  display: grid;
  grid-template-columns: 150px 1fr 1fr;
`;

const Like = styled.div`
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
