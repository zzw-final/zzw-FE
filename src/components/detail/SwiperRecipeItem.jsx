import { React, useContext, useState } from "react";
import styled from "styled-components";
import imageCompression from "browser-image-compression";
import { getCookie } from "../../util/cookie";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "../UI/Button";
import { DetailContext } from "../../context/DetailContext";

const SwiperRecipeItem = ({ idx, contentList, isEditMode, setIsEditMode, onEditPage }) => {
  const { imageUrl, content } = contentList;
  const [imgContentUrlEdited, setImgContentUrlEdited] = useState(imageUrl);

  const data = useContext(DetailContext);
  const {
    postDetail,
    imgUpload,
    onSubmitHandler,
    onDelete,
    editedValues,
    setEditedValues,
    greyButton,
    followHandler,
  } = data;

  const loninNickname = getCookie("loginNickname");
  const loginUserId = getCookie("loginUserId");

  const navigate = useNavigate();

  const getImgUpload = async (e) => {
    const file = e.target.files[0];
    const newFile = await imageCompression(file, {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
    });
    const resizingFile = new File([newFile], file.name, { type: file.type });
    const result = await imgUpload(resizingFile);
    setImgContentUrlEdited(result.data.data.imageUrl);
  };

  let handleChangeIMG = (i, e) => {
    let newFormValues = [...editedValues];
    newFormValues[i][e.target.name] = e.target.src;
    setEditedValues(newFormValues);
  };

  let handleChange = (i, e) => {
    let newFormValues = [...editedValues];
    newFormValues[i][e.target.name] = e.target.value;
    newFormValues[i].page = i;
    setEditedValues(newFormValues);
  };

  const userPage = () => {
    if (loginUserId === postDetail?.authorId) navigate(`/mypage`);
    else navigate(`/mypage/${postDetail?.authorId}`);
  };

  const onSubmit = () => {
    onSubmitHandler();
    setIsEditMode(!isEditMode);
  };

  return (
    <>
      <ItemContainer display={!isEditMode ? "Flex" : "none"}>
        <ItemImg src={imageUrl} alt="RecipeImg" />
        <ItemBox>
          <ItemInfo>
            <Avatar
              alt="user_img"
              src={postDetail?.profile}
              sx={{ width: 40, height: 40, mr: 1 }}
              onClick={userPage}
            />
            <NinknameCreatedAt>
              <Nickname onClick={userPage}>
                {postDetail?.nickname}/{postDetail?.grade}
              </Nickname>
              {loninNickname === postDetail?.nickname ? (
                <ButtonDiv>
                  <>
                    <Button1 onClick={onEditPage}>??????</Button1>
                    <Button1 onClick={onDelete}>??????</Button1>
                  </>
                </ButtonDiv>
              ) : loninNickname ? (
                <ButtonDiv>
                  <Button onClick={followHandler} name="FollowBtn" isFollow={postDetail?.isFollow}>
                    {postDetail?.isFollow ? "?????????" : "?????????"}
                  </Button>
                </ButtonDiv>
              ) : (
                ""
              )}
            </NinknameCreatedAt>
          </ItemInfo>
          <ItemContent>{content}</ItemContent>
        </ItemBox>
      </ItemContainer>
      <ItemContainer display={!isEditMode ? "none" : "Flex"}>
        <ItemImg
          name="imageUrl"
          value={imgContentUrlEdited}
          src={imgContentUrlEdited}
          alt="Recipe"
          onLoad={(e) => handleChangeIMG(idx, e)}
        />
        <ItemImgEdit type="file" accept="image/*" onChange={getImgUpload} />
        <ItemBox>
          <ItemInfo>
            <Avatar
              alt="user_img"
              src={postDetail?.profile}
              sx={{ width: 35, height: 35, mr: 1 }}
              onClick={userPage}
            />
            <NinknameCreatedAt>
              <Nickname onClick={userPage}>
                {postDetail?.grade}/{postDetail?.nickname}
              </Nickname>
              <ButtonDiv>
                <ButtonEdit onClick={onSubmit}>????????????</ButtonEdit>
                <ButtonEdit onClick={onEditPage}>????????????</ButtonEdit>
              </ButtonDiv>
            </NinknameCreatedAt>
          </ItemInfo>
          <ItemContentEdit
            type="text"
            name="content"
            defaultValue={content}
            onBlur={(e) => handleChange(idx, e)}
          ></ItemContentEdit>
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

const ButtonDiv = styled.div`
  display: flex;
  gap: 10px;
  margin-right: 0.6rem;
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

const ItemContent = styled.div`
  font-size: var(--font-semi-small);
  overflow-y: scroll;
  height: auto;
  max-height: 200px;
  width: 90%;
  margin: 0 auto 1rem auto;
  background-color: #ffe8c6;
  padding: 20px;
  border-radius: 10px;
`;

const ItemContentEdit = styled.textarea`
  width: 90%;
  height: 90%;
  margin: 0 1rem 0 1rem;
`;

export default SwiperRecipeItem;
