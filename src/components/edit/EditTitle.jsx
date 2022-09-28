import React, { useState, useEffect, useCallback, useRef } from "react";
import styled from "styled-components";

function EditTitle({ postDetail, editForm }) {
  const [tagItem, setTagItem] = useState("");
  const [foodName, setFoodName] = useState();

  useEffect(() => {
    console.log("postDetial > ", postDetail);
    const foodName = postDetail?.ingredient?.find(
      (item) => item.isName === true
    )?.ingredientName;
    const ingredientList_d = postDetail.ingredient?.filter(
      (item) => item.isName === false
    );
    setFoodName(foodName);
    setTagList(ingredientList_d);
  }, [postDetail]);

  const [tagList, setTagList] = useState();

  useEffect(() => {
    editForm("ingredient", tagList);
  }, [tagList, editForm]);

  const submitTag = () => {
    if (!tagList.includes(tagItem)) {
      setTagList((prevState) => {
        return [...prevState, { ingredientName: tagItem, isName: false }];
      });
    }
    setTagItem("");
  };

  //태그 삭제기능
  const deleteTag = (ingredientName) => {
    setTagList(
      tagList.filter((tagItem) => tagItem.ingredientName !== ingredientName)
    );
  };

  //누르면 태그가 하나의 div
  const onKeyPress = (e) => {
    if (e.target.value !== "" && e.key === "Enter") {
      submitTag();
    }
  };

  return (
    <>
      <Stdiv>
        <WriteTitleinput
          placeholder="제목을 입력해주세요"
          defaultValue={postDetail?.title}
          onChange={(e) => {
            editForm("title", e.target.value);
          }}
        />
        <div styled={{ margin: "10px", display: "flex" }}>
          <FoodnameTag
            placeholder="요리이름 입력해주세요"
            defaultValue={foodName}
            onChange={(e) => {
              editForm("foodName", e.target.value);
            }}
          />
        </div>
        <TagBox>
          {tagList &&
            tagList.map((tagItem, i) => {
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
            onChange={(e) => {
              setTagItem(e.target.value);
            }}
            onKeyPress={onKeyPress}
          />
        </TagBox>
      </Stdiv>
    </>
  );
}

export default EditTitle;

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
