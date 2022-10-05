import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import Like from "./Like";
import { useState } from "react";
import { dateFormat } from "../../util/dateFormat";

const SwiperRecipeItem = ({
  postDetail,
  contentList,
  isFirstPage,
  likeToggle,
}) => {
  const [data, setData] = useState();

  const {
    postId,
    title,
    nickname,
    // profile,
    grade,
    authorId,
    isLike,
    likeNum,
    foodImg,
    createAt,
  } = postDetail;

  const { imageUrl, content, page } = contentList;
  const [likeToggleBtn, setLikeToggleBtn] = useState(isLike);
  const [viewLikeNum, setViewLikeNum] = useState(likeNum);

  const [cookies] = useCookies(["loginNickname"]);
  const navigate = useNavigate();

  const loginNickname = cookies.loginNickname;

  const userPage = () => {
    if (+cookies.loginUserId === authorId) navigate(`/mypage`);
    else navigate(`/mypage/${authorId}`);
  };

  const like = async () => {
    if (loginNickname === undefined) {
      alert("로그인 유저만 사용 가능한 기능입니다.");
      return;
    }
    const likeResult = await likeToggle(postId);
    setLikeToggleBtn(!likeToggleBtn);
    if (likeResult.data.data === "post like success")
      setViewLikeNum(viewLikeNum + 1);
    else setViewLikeNum(viewLikeNum - 1);
  };

  return isFirstPage ? (
    <ItemContainer>
      <ItemImg src={foodImg} alt="Recipe" />
      <LikeBox>
        <Like isLike={likeToggleBtn} btnClick={like} /> {viewLikeNum}
      </LikeBox>
      <ItemBox>
        <ItemInfo>
          <Avatar
            alt="user_img"
            // src={profile}
            sx={{ width: 28, height: 28, mr: 1 }}
            onClick={userPage}
          />
          <NinknameCreatedAt>
            <Nickname onClick={userPage}>
              {grade}/{nickname}
            </Nickname>
            <CreatedAt>{dateFormat(createAt)}</CreatedAt>
          </NinknameCreatedAt>
        </ItemInfo>
        <ItemTitle>{title}</ItemTitle>
      </ItemBox>
    </ItemContainer>
  ) : (
    <ItemContainer>
      <ItemImg src={imageUrl} alt="Recipe" />
      <ItemBox>
        <ItemStep>STEP {page + 1}</ItemStep>
        <ItemContent>{content}</ItemContent>
      </ItemBox>
    </ItemContainer>
  );
};

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: var(--color-black);
  height: 100%;
  width: 100%;
  position: relative;
`;

const ItemImg = styled.img`
  width: 100%;
  height: 60%;
  border-radius: 18px;
  padding: 0.2rem;
  margin-bottom: 1.5rem;
`;

const LikeBox = styled.div`
  display: flex;
  background-color: var(--color-white);
  color: var(--color-grey);
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 5px #dcdcdc;
  border-radius: 18px;
  padding: 0.3rem;
  width: 22%;
  position: absolute;
  right: 8%;
  top: 56%;
`;

const ItemBox = styled.div`
  padding: 0 1rem;
  /* background-color: lavender; */
`;

const ItemInfo = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 1rem;
`;

const NinknameCreatedAt = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Nickname = styled.div`
  font-size: var(--font-small);
  color: var(--color-black);
`;

const CreatedAt = styled.div`
  font-size: var(--font-micro);
  color: var(--color-grey);
`;

const ItemStep = styled.div`
  font-size: var(--font-medium);
  color: var(--color-dark-orange);
  font-weight: bold;
  margin-bottom: 1rem;
`;

const ItemTitle = styled.div`
  font-size: var(--font-medium);
`;

const ItemContent = styled.div`
  font-size: var(--font-medium);
  overflow: scroll;
  height: 100%;
`;

export default SwiperRecipeItem;
