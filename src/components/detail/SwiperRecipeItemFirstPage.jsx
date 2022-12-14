import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import Like from "../common/Like";
import imageCompression from "browser-image-compression";
import { getCookie } from "../../util/cookie";
import Button from "../UI/Button";
import { DetailContext } from "../../context/DetailContext";

const SwiperRecipeItemFirstPage = ({ isEditMode, setIsEditMode, onEditPage }) => {
  const data = useContext(DetailContext);

  const { postDetail, imgUpload, onSubmitHandler, onDelete, editForm, followHandler } = data;
  const { title, nickname, profile, grade, authorId, isLike, likeNum, foodImg } = postDetail;

  const [imgFoodUrlEdited, setImgFoodUrlEdited] = useState(foodImg);

  const loninNickname = getCookie("loginNickname");
  const loginUserId = getCookie("loginUserId");

  const navigate = useNavigate();

  const userPage = () => {
    if (loginUserId === authorId) navigate(`/mypage`);
    else navigate(`/mypage/${authorId}`);
  };

  //좋아요 수정해보자
  const { id } = useParams();

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

  const onSubmit = () => {
    onSubmitHandler();
    setIsEditMode(!isEditMode);
  };

  return (
    <>
      <ItemContainer display={!isEditMode ? "Flex" : "none"}>
        <ItemImg src={foodImg} alt="Recipe" />
        <TimeBox>
          <Time>⏱ {postDetail?.time} min</Time>
        </TimeBox>
        <LikeBox>
          <Like isLike={isLike} postId={id} /> {likeNum}
        </LikeBox>
        <ItemBox>
          <ItemInfo>
            <Avatar
              alt="user_img"
              src={profile}
              sx={{ width: 40, height: 40, mr: 1 }}
              onClick={userPage}
            />
            <NinknameCreatedAt>
              <Nickname onClick={userPage}>
                {nickname}/{grade}
              </Nickname>
              {loninNickname === nickname ? (
                <ButtonDiv>
                  <Button1 onClick={onEditPage}>수정</Button1>
                  <Button1 onClick={onDelete}>삭제</Button1>
                </ButtonDiv>
              ) : loninNickname ? (
                <ButtonDiv>
                  <Button onClick={followHandler} name="FollowBtn" isFollow={postDetail?.isFollow}>
                    {postDetail?.isFollow ? "팔로잉" : "팔로우"}
                  </Button>
                </ButtonDiv>
              ) : (
                ""
              )}
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
              sx={{ width: 40, height: 40, mr: 1 }}
              onClick={userPage}
            />
            <NinknameCreatedAt>
              <Nickname onClick={userPage}>
                {grade}/{nickname}
              </Nickname>
              <ButtonDiv>
                <ButtonEdit onClick={onSubmit}>수정완료</ButtonEdit>
                <ButtonEdit onClick={onEditPage}>수정취소</ButtonEdit>
              </ButtonDiv>
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

const TimeBox = styled.div`
  display: flex;
  background-color: var(--color-white);
  color: var(--color-grey);
  position: absolute;
  top: 3%;
  left: 14%;
  border-radius: 15px;
  padding: 0.3rem;
  width: 27%;
`;

const Time = styled.div`
  font-size: var(--font-semi-small);
  margin-left: 0.5rem;
  font-weight: var(--weight-bold);
`;

const ItemImg = styled.img`
  width: 78%;
  height: 53%;
  border-radius: 18px;
  padding: 0.2rem;
  margin: 0 auto 1rem auto;
`;

const ItemImgEdit = styled.input`
  position: absolute;
  top: 47%;
  left: 12%;
`;

const LikeBox = styled.div`
  display: flex;
  background-color: var(--color-white);
  color: var(--color-grey);
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  padding: 0.3rem;
  width: 15%;
  position: absolute;
  right: 15%;
  top: 44%;
  font-size: var(--font-regular);
`;

const ItemBox = styled.div`
  padding: 0 1rem;
`;

const ItemInfo = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 1rem;
  margin-left: 5px;
`;

const NinknameCreatedAt = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Nickname = styled.div`
  font-size: var(--font-semi-small);
  color: var(--color-black);
  margin-top: 3px;
`;

const ItemTitle = styled.div`
  font-size: var(--font-semi-small);
  margin-left: 15px;
`;

const ItemTitleEdit = styled.input`
  width: 97%;
  border-radius: 10px;
  height: 40%;
  padding: 6px;
`;

const ButtonDiv = styled.div`
  display: flex;
  gap: 10px;
  margin-right: 0.5rem;
`;

const Button1 = styled.button`
  font-size: var(--font-regular);
  font-weight: var(--weight-bold);
  color: white;
  text-align: center;
  width: 3rem;
  height: 1.7rem;
  background-color: #fbd499;
  border-radius: 3px;
  box-shadow: 2px 2px 5px #bebebe;
  border: none;
`;

const ButtonEdit = styled.button`
  font-size: var(--font-small);
  font-weight: var(--weight-semi-bold);
  color: #232323;
  text-align: center;
  width: 4rem;
  height: 1.5rem;
  background-color: #fbf8f0;
  border-radius: 3px;
  box-shadow: 2px 2px 5px #bebebe;
  margin-top: 2px;
  border: none;
`;

export default SwiperRecipeItemFirstPage;
