import React, { useEffect, useState } from "react";
import styled from "styled-components";

const WriteTitle = ({}) => {
  // console.log(setTitle);

  const [title, setTitle] = useState("");
  const [foodname, setFoodName] = useState("");
  const [ingredient, setIngredient] = useState([]);
  const [time, setTime] = useState("");
  const [file, setFile] = useState([]);

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
  console.log(tagList);

  const deleteTag = (ingredientName) => {
    setTagList(
      tagList.filter((tagItem) => tagItem.ingredientName !== ingredientName)
    );
  };

  const onKeyPress = (e) => {
    if (e.target.value !== "" && e.key === "Enter") {
      submitTag();
    }
  };

  useEffect(() => {
    setIngredient(tagList);
  }, [tagList]);

  return (
    <WriteTitleContainer>
      <Title placeholder="제목을 입력해주세요" />
      <FoodNameInput placeholder="요리이름 입력해주세요" />
      <TagBox>
        {tagList.map((tagItem, i) => {
          return (
            <Tagdiv key={i}>
              <div>{tagItem.ingredientName}</div>
              <Button onClick={() => deleteTag(tagItem.ingredientName)}>
                X
              </Button>
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
        placeholder="요리 시간을 선택해주세요"
        onChange={(e) => {
          setTime(e.target.value);
        }}
      >
        <option value="0">5분</option>
        <option value="1">10분</option>
        <option value="2">15분</option>
        <option value="3">30분 이상</option>
      </TimeSelect>
      <PreviewImg
        // src={imageURL}
        src={"https://cdn-icons-png.flaticon.com/512/149/149092.png"}
      />
      <ImgInput
        type="file"
        accept="image/*"
        multiple="multiple"
        onChange={imgUpload}
        value={imageURL}
      />
    </WriteTitleContainer>
  );
};

export default WriteTitle;

const Stdiv = styled.div`
  margin: 10px;
  height: 50%;
`;

const WriteTitleinput = styled.input`
  box-sizing: border-box;
  /* position: absolute; */
  width: 340px;
  height: 5vh;
  left: 26px;
  top: 90px;
  border: 1px solid #a8a8a8;
  border-radius: 10px;
  margin: 9px;
`;

const FoodnameTag = styled.input`
  box-sizing: border-box;
  /* position: absolute; */
  width: 220px;
  height: 5vh;
  left: 26px;
  top: 149px;
  margin-left: 8px;
`;

const FoodNameInput = styled.input`
  width 60vw;
height:4vh;
border-radius: 5px;
grid-column-start:2;
grid-row-start:2;
margin:1vh 1rem 0rem 1rem;
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
  margin: 1vh 1rem 1rem 1rem;
`;

const TimeSelect = styled.select`
  box-sizing: border-box;
  width: 20vw;
  height: 3vh;
  margin: 2vw 2px 0rem 5rem;
  border: 1px solid #9c9c9c;
  border-radius: 10px;
  grid-column-start: 2;
  grid-row-start: 4;
`;
const PreviewImg = styled.img`
  /* background-color: blue; */
  width: 60vw;
  height 20vh;
  margin: 0rem 1rem 0rem 1rem;
  grid-column-start: 2;
  grid-row-start: 5;
`;

const ImgInput = styled.input`
  grid-column-start: 2;
  grid-row-start: 6;
`;
