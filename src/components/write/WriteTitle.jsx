import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Tag from "../common/Tag";
import WriteCard from "./WriteCard";
import imageCompression from "browser-image-compression";

const WriteTitle = ({
  setTitle,
  setFoodName,
  setIngredient,
  setTime,
  setImageURL,
  imageURL,
  imgUpload,
}) => {
  const [tagItem, setTagItem] = useState("");
  const [tagList, setTagList] = useState([]);

  const submitTag = (prevState) => {
    if (!tagList.includes(tagItem)) {
      setTagList((prevState) => {
        return [...prevState, tagItem];
      });
    }
    setTagItem("");
  };

  const deleteTag = (ingredientName) => {
    setTagList(tagList.filter((tagItem) => tagItem !== ingredientName));
  };

  const onKeyPress = (e) => {
    if (e.target.value !== "" && e.key === "Enter") {
      if (tagList.length < 11) {
        submitTag();
      }
    }
  };

  useEffect(() => {
    setIngredient(tagList);
  }, [tagList]);

  //파일업로드 버튼 예쁘게 커스텀하기 위한 ref
  const imgInput = useRef();

  const onClickImgInput = () => {
    imgInput.current.click();
  };
  //이미지 파일 리사이징
  const getImgUpload = async (e) => {
    const [file] = e.target.files;
    const newFile = await imageCompression(file, {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
    });
    const resizingFile = new File([newFile], file.name, { type: file.type });
    const result = await imgUpload(resizingFile);
    setImageURL(result.data.data.imageUrl);
    localStorage.setItem("titleIMG", result.data.data.imageUrl);
  };

  return (
    <WriteTitleContainer>
      <Title
        placeholder="제목을 입력해주세요"
        // ref={titleRef}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <FoodNameInput
        placeholder="요리이름 입력해주세요"
        // ref={foodnameRef}
        onChange={(e) => {
          setFoodName(e.target.value);
        }}
      />

      <TagBox>
        {tagList.map((tagItem, i) => {
          return (
            <Tagdiv key={i}>
              <div>{tagItem}</div>
              <Button onClick={() => deleteTag(tagItem)}>X</Button>
            </Tagdiv>
          );
        })}
        <IngredintTag
          value={tagItem}
          placeholder="재료를 태그로 입력해주세요"
          onChange={(e) => {
            setTagItem(e.target.value);
          }}
          onKeyPress={onKeyPress}
        />
      </TagBox>
      <SelectDiv>조리시간 </SelectDiv>
      <TimeSelect
        onChange={(e) => {
          setTime(e.target.value);
        }}
      >
        <option value="5분">5분</option>
        <option value="10분">10분</option>
        <option value="15분">15분</option>
        <option value="30분">30분 이상</option>
      </TimeSelect>
      <PreviewImg src={imageURL} />
      <StyledFileInput onClick={onClickImgInput}>이미지 선택</StyledFileInput>
      <ImgNotion onClick={onClickImgInput}>
        최대 1MB까지 업로드 가능합니다.
      </ImgNotion>
      <ImgInput
        type="file"
        accept="image/*"
        multiple="multiple"
        onChange={(e) => getImgUpload(e)}
        ref={imgInput}
      />
      {/* <button onClick={onClickImgInput}>대표이미지를 업로드 해주세요 !</button> */}
    </WriteTitleContainer>
  );
};

export default WriteTitle;

const WriteTitleContainer = styled.div`
  background-color: white;
  margin: auto auto;
  width: 80vw;
  height: 60vh;
  border-radius: 20px;
  display: grid;
  justify-items: center;
  gap: 5px;
  grid-template-columns: 1rem 1fr 1rem;
  grid-template-rows: 8vh 5vh 1fr 5vh 1fr 1fr 1fr;
  align-items: stretch;
`;

const Title = styled.input`
  width: 60vw;
  height: 4vh;
  border-radius: 5px;
  grid-column-start: 2;
  grid-row-start: 1;
  margin: 4vh 1rem 0px 1rem;
`;
const FoodNameInput = styled.input`
  width: 60vw;
  height: 4vh;
  border-radius: 5px;
  grid-column-start: 2;
  grid-row-start: 2;
  margin: 1vh 1rem 0rem 1rem;
`;
const TagBox = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 60vw;
  min-height: 5vh;
  margin: 1vh 1rem 0rem 1rem;
  padding: 0 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  grid-column-start: 2;
  grid-row-start: 3;
  overflow: auto;
  &:focus-within {
    border-color: var(--color-light-blue);
  }
`;
const IngredintTag = styled.input`
  box-sizing: border-box;
  display: inline-flex;
  min-width: 150px;
  background: transparent;
  border: none;
  outline: none;
  cursor: text;
`;
const Tagdiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px;
  padding: 5px;
  background-color: var(--color-dark-pink);
  border-radius: 5px;
  color: white;
  font-size: 13px;
`;
const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15px;
  height: 15px;
  margin-left: 1px;
  background-color: white;
  border-radius: 50%;
  color: black;
`;
const SelectDiv = styled.div`
  grid-column-start: 2;
  grid-row-start: 4;
  margin: 1vh 1rem 1rem -10rem;
`;
const TimeSelect = styled.select`
  box-sizing: border-box;
  width: 20vw;
  height: 3vh;
  margin: 2vw 2px 0rem -1rem;
  border: 1px solid #9c9c9c;
  border-radius: 10px;
  grid-column-start: 2;
  grid-row-start: 4;
`;
const PreviewImg = styled.img`
  /* background-color: blue; */
  width: 60vw;
  height: 20vh;
  border: 0;
  border-radius: 10px;
  margin: 0rem 1rem 0rem 1rem;
  grid-column-start: 2;
  grid-row-start: 5;
`;
const ImgInput = styled.input`
  /* grid-column-start: 2;
  grid-row-start: 6; */
  display: none;
`;

const StyledFileInput = styled.button`
  grid-column-start: 2;
  grid-row-start: 6;
  width: 25vw;
  height: 2vh;
  font-size: 10px;
  border: 0;
  border-radius: 5px;
  background-color: #ffbb56;
  margin-top: 3vw;
`;

const ImgNotion = styled.label`
  font-size: 3px;
  margin-top: 16px;
  color: var(--color-dark-white);
  grid-column-start: 2;
  grid-row-start: 6;
  margin-top: 10vw;
`;
