import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import Like from "../common/Like";
import { useState } from "react";
import { dateFormat } from "../../util/dateFormat";
import { useEffect } from "react";
import imageCompression from "browser-image-compression";

const SwiperRecipeItemFirstPage = ({
  postDetail,
  likeToggle,
  isEditMode,
  imgUpload,
  editForm,
}) => {
  const {
    postId,
    title,
    nickname,
    profile,
    grade,
    authorId,
    isLike,
    likeNum,
    foodImg,
    createAt,
  } = postDetail;

  const [likeToggleBtn, setLikeToggleBtn] = useState(isLike);
  const [viewLikeNum, setViewLikeNum] = useState(likeNum);

  const [cookies] = useCookies(["loginNickname"]);
  const navigate = useNavigate();

  const [imgFoodUrlEdited, setImgFoodUrlEdited] = useState(foodImg);
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
    // const likeResult = mutate(postId);
    // console.log("isLike :>> ", isLike);
    // mutate(postId);
    setLikeToggleBtn(!likeToggleBtn);
    if (likeResult.data.data === "post like success")
      setViewLikeNum(viewLikeNum + 1);
    else setViewLikeNum(viewLikeNum - 1);
  };

  const getImgFoodUpload = async (e) => {
    const result = await imgUpload(e);
    setImgFoodUrlEdited(result.data.data.imageUrl);
  };

  useEffect(() => {
    editForm("imageUrl", imgFoodUrlEdited);
  }, [imgFoodUrlEdited]);

  const getImgUpload = async (e) => {
    const [file] = e.target.files;
    const newFile = await imageCompression(file, {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
    });
    const resizingFile = new File([newFile], file.name, { type: file.type });
    const result = await imgUpload(resizingFile);
    setImgFoodUrlEdited(result.data.data.imageUrl);
  };
  return (
    <>
      <ItemContainer display={!isEditMode ? "Flex" : "none"}>
        <ItemImg src={foodImg} alt="Recipe" />
        <LikeBox>
          <Like isLike={likeToggleBtn} btnClick={like} /> {viewLikeNum}
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
                {nickname}/{grade}
              </Nickname>
              <CreatedAt>{dateFormat(createAt)}</CreatedAt>
            </NinknameCreatedAt>
          </ItemInfo>
          <ItemTitle>{title}</ItemTitle>
        </ItemBox>
      </ItemContainer>
      <ItemContainer display={!isEditMode ? "none" : "Flex"}>
        <ItemImg src={imgFoodUrlEdited} alt="Recipe" />
        <ItemImgEdit type="file" accept="image/*" onChange={getImgUpload} />
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
              <CreatedAt>{dateFormat(createAt)}</CreatedAt>
            </NinknameCreatedAt>
          </ItemInfo>
          <ItemTitleEdit
            defaultValue={title}
            onBlur={(e) => {
              editForm("title", e.target.value);
            }}
          ></ItemTitleEdit>
        </ItemBox>
      </ItemContainer>
    </>
  );
};

const ItemContainer = styled.div`
  display: ${({ display }) => display};
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

const ItemImgEdit = styled.input`
  position: absolute;
  top: 300px;
  left: 16px;
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

const ItemTitle = styled.div`
  font-size: var(--font-medium);
`;

const ItemTitleEdit = styled.input`
  width: 100%;
`;

export default SwiperRecipeItemFirstPage;
