import React from "react";
import styled from "styled-components";

const Tag = ({ tagName, isFoodName, idDelBtn, delBtnClick }) => {
  return (
    <TagContainer color={randomColor(isFoodName)}>
      {tagName} {idDelBtn ? <DelBtn onClick={delBtnClick}>X</DelBtn> : ""}
    </TagContainer>
  );
};

const TagContainer = styled.div`
  font-size: var(--font-small);
  background-color: ${(props) => props.color};
  padding: 0.1rem 0.3rem;
  border-radius: 20px;
  height: 19px;
  display: flex;
  align-items: center;
`;

const DelBtn = styled.div`
  font-size: var(--font-small);
  background-color: var(--color-light-white);
  border-radius: 50%;
  width: 17px;
  height: 17px;
  text-align: center;
  margin-left: 2px;
`;

function randomColor(isFoodName) {
  const color = [
    "#fce4ec",
    "#e2fff3",
    "#ffe3ed",
    "#fbe7ff",
    "#efe7fd",
    "#e2f5ff",
    "#e4f1fc",
    "#e6fefc",
    "#e6fee6",
    "#edffd8",
    "#fdffe7",
    "#fffbd7",
    "#ffe7c4",
    "#fff0c2",
    "#ffebab",
    "#ffe7e0",
  ];

  const min = 0;
  const max = color.length;
  let randomColorNum = Math.floor(Math.random() * (max - min)) + min;

  if (isFoodName) {
    return "#ffffff";
  } else {
    return color[randomColorNum];
  }
}

export default Tag;
