import React from "react";
import styled from "styled-components";

const Tag = ({ tagName, isFoodName, isDelBtn, delBtnClick, ...props }) => {
  return (
    <TagContainer {...props} color={randomColor(isFoodName)}>
      {tagName} {isDelBtn ? <DelBtn onClick={delBtnClick}>X</DelBtn> : ""}
    </TagContainer>
  );
};

const TagContainer = styled.div`
  font-size: var(--font-small);
  background-color: ${(props) => props.color};
  border-radius: 20px;
  height: ${({ height }) => height || "19px"};
  display: flex;
  /* overflow: visible; */
  align-items: center;
  margin: ${({ margin }) => margin || "0 0 0 0.15rem"};
  padding: ${({ padding }) => padding || "0.1rem 0.3rem"};
  opacity: ${({ opacity }) => opacity || ""};
  box-shadow: ${({ boxShadow }) => boxShadow || ""};
  cursor: pointer;
  /* overflow: visible; */
`;

const DelBtn = styled.div`
  font-size: var(--font-small);
  /* background-color: var(--color-white); */
  color: var(--color-dark-orange);
  border-radius: 50%;
  width: 17px;
  height: 17px;
  text-align: center;
  margin-left: 2px;
  cursor: pointer;
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
