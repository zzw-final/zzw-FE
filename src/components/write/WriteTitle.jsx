import React, { useEffect, useState } from "react";
import styled from "styled-components";

const WriteTitle = ({ setTitle, setFoodName, setIngredient, setTime }) => {
  console.log(setTitle);

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
  const onKeyPress = (e) => {
    if (e.target.value !== "" && e.key === "Enter") {
      submitTag();
    }
  };

  // useEffect(()=>{
  //     setFoodName(tagList)
  // })

  return (
    <Stdiv>
      <WriteTitleinput
        placeholder="제목을 입력해주세요"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <div styled={{ margin: "10px", display: "flex" }}>
        <FoodnameTag
          value={tagItem}
          placeholder="요리이름 태그로 입력해주세요"
          onChange={(e) => {
            setTagItem(e.target.value);
          }}
          onKeyPress={onKeyPress}
        />
        <TimeSelect
          placeholder="요리 시간을 선택해주세요"
          onChange={(e) => {
            setTime(e.target.value);
          }}
        >
          <option value="5분">5분</option>
          <option value="10분">10분</option>
          <option value="15분">15분</option>
          <option value="30분 이상">30분 이상</option>
        </TimeSelect>
      </div>
      <IngredintTag
        placeholder="재료를 태그로 입력해주세요"
        onChange={(e) => {
          setIngredient(e.target.value);
        }}
      />
    </Stdiv>
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

  border: 1px solid #acacac;
  border-radius: 10px;
`;

const TimeSelect = styled.select`
  box-sizing: border-box;

  /* position: absolute; */
  width: 110px;
  height: 5vh;
  left: 273px;
  top: 149px;
  margin-left: 5px;

  border: 1px solid #9c9c9c;
  border-radius: 10px;
`;

const IngredintTag = styled.input`
  box-sizing: border-box;

  /* position: absolute; */
  width: 340px;
  height: 5vh;
  left: 26px;
  top: 208px;
  margin: 10px;

  border: 1px solid #9c9c9c;
  border-radius: 10px;
`;
