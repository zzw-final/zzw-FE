import React, { useEffect, useState } from "react";
import styled from "styled-components";

const WriteTitle = ({ setTitle, setFoodName, setIngredient, setTime }) => {
  // console.log(setTitle);

  const [tagItem, setTagItem] = useState("");
  const [tagList, setTagList] = useState([]);

  const submitTag = (prevState) => {
    if (!tagList.includes(tagItem)) {
      setTagList((prevState) => {
        return [...prevState, { ingredientName: tagItem }];
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
    <Stdiv>
      <WriteTitleinput
        placeholder="제목을 입력해주세요"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <div styled={{ margin: "10px", display: "flex" }}>
        <FoodnameTag
          placeholder="요리이름 입력해주세요"
          onChange={(e) => {
            setFoodName(e.target.value);
          }}
        />
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
      </div>
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

const TagBox = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 340px;
  min-height: 5vh;
  margin: 8px;
  padding: 0 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 10px;

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
