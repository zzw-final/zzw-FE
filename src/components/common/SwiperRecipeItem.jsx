import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import Like from "./Like";
import { useState } from "react";
import { dateFormat } from "../../util/dateFormat";
import { useRef } from "react";
import { useEffect } from "react";

const SwiperRecipeItemFirstPage = ({
  postDetail,
  contentList,
  likeToggle,
  isEditMode,
  imgUpload,
  editedValues,
  setEditedValues,
  idx,
}) => {
  const { imageUrl, content, page } = contentList;

  const [imgContentUrlEdited, setImgContentUrlEdited] = useState(imageUrl);
  // const [editedContent, setEditedContent] = useState(content);
  // const [editedTitle, setEditedTitle] = useState(title);

  const addFormFields = () => {
    setEditedValues([
      ...editedValues,
      { imageUrl: imageUrl, content: content, page: page },
    ]);
  };

  useEffect(() => {
    addFormFields();
  }, []);

  console.log("content :>> ", content);

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

  const getImgContentUpload = async (e) => {
    const result = await imgUpload(e);
    setImgContentUrlEdited(result.data.data.imageUrl);
  };

  return (
    <>
      <ItemContainer display={!isEditMode ? "Flex" : "none"}>
        <ItemImg src={imageUrl} alt="Recipe" />
        <ItemBox>
          <ItemStep>STEP {page + 1}</ItemStep>
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
        <ItemImgEdit
          type="file"
          accept="image/*"
          onChange={getImgContentUpload}
        />
        <ItemBox>
          <ItemStep>STEP {page + 1}</ItemStep>
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

const ItemBox = styled.div`
  padding: 0 1rem;
  /* background-color: lavender; */
`;

const ItemStep = styled.div`
  font-size: var(--font-medium);
  color: var(--color-dark-orange);
  font-weight: bold;
  margin-bottom: 1rem;
`;

const ItemContent = styled.div`
  font-size: var(--font-medium);
  overflow: scroll;
  height: 100%;
`;

const ItemContentEdit = styled.textarea`
  width: 100%;
`;

export default SwiperRecipeItemFirstPage;
