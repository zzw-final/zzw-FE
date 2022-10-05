import React, { useEffect, useState } from "react";
import styled from "styled-components";

const TagList = ({ postDetail, editForm }) => {
  const foodIngredientList = postDetail?.ingredient
    .map((ingredient) =>
      !ingredient.isName ? ingredient.ingredientName : undefined
    )
    .filter((ingredient) => ingredient !== undefined);
  const [tagItem, setTagItem] = useState("");
  const [tagList, setTagList] = useState(foodIngredientList);

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
      submitTag();
    }
  };

  console.log("tagList :>> ", tagList);

  useEffect(() => {
    console.log("들어와..?");
    editForm("ingredient", tagList);
  }, [tagList]);

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

const Button = styled.button`
  font-size: var(--font-small);
  font-weight: var(--weight-semi-bold);
  color: #232323;
  text-align: center;
  width: 2.5rem;
  height: 1.2rem;
  background-color: #fbf8f0;
  border-radius: 3px;
  box-shadow: 2px 2px 5px #bebebe;
  border: none;
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

const IngredintTag = styled.input`
  box-sizing: border-box;
  display: inline-flex;
  min-width: 150px;
  background: transparent;
  border: none;
  outline: none;
  /* cursor: text; */
`;

export default TagList;
