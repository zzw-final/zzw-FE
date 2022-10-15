import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
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

  //파일업로드 버튼커스텀하기 위한 ref
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
      <PreviewImg src={imageURL} onClick={onClickImgInput} />
      <TitleNoti>제목</TitleNoti>
      <Title
        placeholder="제목을 입력해주세요"
        // ref={titleRef}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <FoodNameNoti>요리이름</FoodNameNoti>
      <FoodNameInput
        placeholder="요리이름 입력해주세요"
        // ref={foodnameRef}
        onChange={(e) => {
          setFoodName(e.target.value);
        }}
      />
      <TagNoti>해시 태그</TagNoti>
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

      <ImgInput
        type="file"
        accept="image/*"
        multiple="multiple"
        onChange={(e) => getImgUpload(e)}
        ref={imgInput}
      />
    </WriteTitleContainer>
  );
};

export default WriteTitle;

const WriteTitleContainer = styled.div`
  /* background-color: green; */
  margin: auto auto;
  width: 98%;
  height: 80vh;
  display: grid;
  justify-items: left;
  gap: 5px;
  grid-template-columns: 1rem 1fr 1rem;
  grid-template-rows: 1fr 1fr 1fr 0.8fr 1fr;
  align-items: stretch;
`;

const TitleNoti = styled.p`
  grid-column-start: 2;
  grid-row-start: 2;
  font-size: var(--font-medium);
  font-weight: var(--weight-semi-bold);

  margin: 1rem 0 0 1rem;
`;

const Title = styled.input`
  width: 100%;
  height: 6vh;
  border: 0;
  box-sizing: border-box;
  background-color: var(--color-light-white);
  border-radius: 15px;
  grid-column-start: 2;
  grid-row-start: 2;
  margin: 3rem 0rem 0px 0rem;
  padding: 10px;
`;

const FoodNameNoti = styled.p`
  grid-column-start: 2;
  grid-row-start: 3;
  font-size: var(--font-medium);
  font-weight: var(--weight-semi-bold);
  margin: 1rem 0 0 1rem;
`;
const FoodNameInput = styled.input`
  width: 100%;
  height: 6vh;
  border: 0;
  box-sizing: border-box;
  background-color: var(--color-light-white);
  border-radius: 15px;
  grid-column-start: 2;
  grid-row-start: 3;
  margin: 3rem 0rem 0px 0rem;
  padding: 10px;
`;
const TagNoti = styled.p`
  grid-column-start: 2;
  grid-row-start: 4;
  font-size: var(--font-medium);
  font-weight: var(--weight-semi-bold);
  margin: 1rem 0 0 1rem;
`;
const TagBox = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  height: 6vh;
  max-height: 6vh;
  overflow-y: scroll;
  margin: 3rem 0rem 0px 0rem;
  padding: 0 10px;
  border: 0;
  background-color: var(--color-light-white);
  box-sizing: border-box;
  border-radius: 15px;
  grid-column-start: 2;
  grid-row-start: 4;
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
  background-color: #ffb84e;
  border-radius: 5px;
  color: black;
  font-size: 13px;
`;
const Button = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15px;
  height: 15px;
  margin-left: 1px;
  font-weight: var(--weight-bold);
  background-color: none;
  border: 0;
  border-radius: 50%;
  color: white;
`;
const SelectDiv = styled.div`
  grid-column-start: 2;
  grid-row-start: 5;
  margin: 1rem 0 0 1rem;
  font-size: var(--font-medium);
  font-weight: var(--weight-semi-bold);
`;
const TimeSelect = styled.select`
  box-sizing: border-box;
  width: 40%;
  height: 5vh;
  margin: 3rem 0rem 0px 0rem;
  border: 0;
  box-sizing: border-box;
  background-color: var(--color-light-white);
  border-radius: 15px;
  grid-column-start: 2;
  grid-row-start: 5;
  padding: 10px;
`;
const PreviewImg = styled.img`
  width: 70vw;
  height: 30vh;
  border: 0;
  border-radius: 10px;
  margin: 1rem 1rem 0rem 2rem;
  grid-column-start: 2;
  grid-row-start: 1;
`;
const ImgInput = styled.input`
  display: none;
`;
