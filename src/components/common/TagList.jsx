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

  console.log("foodIngredientList > ", foodIngredientList);

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

  useEffect(() => {
    const ingredientList_d = postDetail?.ingredient?.filter(
      (item) => item.isName === false
    );
    setTagList(ingredientList_d);
  }, [postDetail]);

  useEffect(() => {
    editForm("ingredient", tagList);
  }, [tagList]);

  return (
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
        // value={}
        onChange={(e) => {
          setTagItem(e.target.value);
        }}
        onKeyPress={onKeyPress}
      />
    </TagBox>
  );
};

const DetailContainer = styled.div``;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 1.9rem 1.5rem 1.9rem;
`;

const FoodnameDiv = styled.div`
  display: flex;
  align-items: center;
`;

const Foodname = styled.div`
  font-size: var(--font-medium-large);
  font-weight: var(--weight-bolder);
`;

const FoodnameEdit = styled.input`
  font-size: var(--font-small);
  width: 7rem;
`;

const Time = styled.div`
  font-size: var(--font-small);
  margin-left: 0.3rem;
`;

const TimeSelect = styled.select`
  box-sizing: border-box;
  /* position: absolute; */
  width: 4rem;
  height: 1.4rem;
  left: 273px;
  top: 149px;
  margin-left: 5px;

  border: 1px solid #9c9c9c;
  border-radius: 10px;
`;

const ButtonDiv = styled.div`
  display: flex;
  gap: 10px;
`;

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

const ButtonEdit = styled.button`
  font-size: var(--font-small);
  font-weight: var(--weight-semi-bold);
  color: #232323;
  text-align: center;
  width: 4rem;
  height: 1.2rem;
  background-color: #fbf8f0;
  border-radius: 3px;
  box-shadow: 2px 2px 5px #bebebe;
  border: none;
`;

const Tags = styled.div`
  margin-left: 1rem;
  display: flex;
  padding: 0.2rem;
  gap: 0.5rem;
  white-space: nowrap;

  &::-webkit-scrollbar {
    display: none;
  }
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

const Content = styled.div`
  overflow: hidden;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2rem 1.5rem 0rem 1.5rem;
  align-items: center;
`;

const FootLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Icon = styled.img`
  width: 25px;
  height: 25px;
`;

const Comment = styled.div`
  background-color: var(--color-white);
  padding: 0.2rem 0.5rem;
  box-shadow: 0 0 10px rgb(0 0 0 / 30%);
  border-radius: 15px;
  font-weight: var(--weight-bold);
`;

const SearchBox = styled.div`
  /* background-color: lavender; */
  display: flex;
  flex-direction: column;
  height: 14vh;
  position: relative;
`;

const CommentFoldLine = styled.div`
  width: 20%;
  height: 0.2rem;
  background-color: var(--color-orange);
  margin: 0.5rem auto 2rem auto;
`;

const CommentListBox = styled.div`
  background-color: var(--color-white);
  z-index: 1;
  width: 100%;
  height: 100%;
  border-radius: 2rem 2rem 0 0;
  box-shadow: 0px 0px 20px #5b5b5b;
  transition: all 600ms cubic-bezier(0.86, 0, 0.07, 1);
  top: ${({ top }) => (top ? "9%" : "100%")};
  position: fixed;
  left: 0;
`;

const CommentBox = styled.div`
  width: 100%;
`;

export default TagList;
