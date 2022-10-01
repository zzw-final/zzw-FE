import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import Like from "./Like";
import { useState } from "react";

const SwiperRecipeItem = ({ IMSIdata, IMSIdataDetail, isFirstPage }) => {
  const [data, setData] = useState();

  const {
    postId,
    title,
    nickname,
    profile,
    grade,
    userId,
    pageCnt,
    isLike,
    likeNum,
    foodImg,
    createAt,
  } = IMSIdata;

  const { imageUrl, content } = IMSIdataDetail;

  //   const [cookies] = useCookies(["loginNickname"]);
  //   const navigate = useNavigate();

  //   const loginNickname = cookies.loginNickname;

  const userPage = () => {
    //   if (+cookies.loginUserId === userId) navigate(`/mypage`);
    //   else navigate(`/mypage/${userId}`);
  };

  return isFirstPage ? (
    <ItemContainer>
      <ItemImg src={foodImg} alt="Recipe" />
      <LikeBox>
        <Like /> {likeNum}
      </LikeBox>
      <ItemBox>
        <ItemInfo>
          <Avatar
            alt="user_img"
            src={profile}
            sx={{ width: 28, height: 28, mr: 1 }}
            onClick={userPage}
          />
          <NinknameCreatedAt>
            <Nickname onClick={userPage}>
              {grade}/{nickname}
            </Nickname>
            <CreatedAt>{createAt}</CreatedAt>
          </NinknameCreatedAt>
        </ItemInfo>
        <ItemTitle>{title}</ItemTitle>
      </ItemBox>
    </ItemContainer>
  ) : (
    <ItemContainer>
      <ItemImg src={imageUrl} alt="Recipe" />
      {/* <LikeBox><Like /> {likeNum}</LikeBox> */}
      <ItemBox>
        <ItemStep>STEP 1</ItemStep>
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
