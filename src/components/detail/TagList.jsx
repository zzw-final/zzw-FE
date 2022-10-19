import React, { useEffect, useState } from "react";
import styled from "styled-components";

const TagList = ({ postDetail, editForm, setEditedIngredient }) => {
  const foodIngredientList = postDetail?.ingredient
    .map((ingredient) =>
      !ingredient.isName ? ingredient.ingredientName : undefined
    )
    .filter((ingredient) => ingredient !== undefined);
  const [tagItem, setTagItem] = useState("");
  const [tagList, setTagList] = useState(foodIngredientList);

  const submitTag = () => {
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
      submitTag();
    }
  };

  useEffect(() => {
    setEditedIngredient(tagList);
  }, [setEditedIngredient, tagList]);

  return (
    <TagBox>
      {tagList &&
        tagList.map((tagItem, i) => {
          return (
            <Tagdiv key={i}>
              <div>{tagItem}</div>
              <Button onClick={() => deleteTag(tagItem)}>X</Button>
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
  );
};

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

const TagBox = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 90%;
  overflow-y: scroll;
  min-height: 5vh;
  margin: 0rem 1rem 0px 1rem;
  padding: 0 10px;
  border: 0;
  border-radius: 10px;
  background-color: var(--color-light-white);

  &:focus-within {
    border-color: var(--color-light-blue);
  }
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

const IngredintTag = styled.input`
  box-sizing: border-box;
  display: inline-flex;
  min-width: 150px;
  background: transparent;
  border: none;
  outline: none;
`;

export default TagList;
