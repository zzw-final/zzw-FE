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

=======
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
    "#f9a825",
    "#ffcdd2",
    "#bbdefb",
    "#9fa8da",
    "#f8bbd0",
    "#e1bee7",
    "#4fc3f7",
    "#80deea",
    "#b2dfdb",
    "#c8e6c9",
    "#dcedc8",
    "#f0f4c3",
    "#ccff90",
    "#f4ff81",
    "#fff9c4",
    "#ffe082",
    "#ffcc80",
    "#ffab91",
    "#bcaaa4",
    "#eeeeee",
    "#cfd8dc",
  ];

  const min = 0;
  const max = color.length;
  let randomColorNum = Math.floor(Math.random() * (max - min)) + min;


  if (isFoodName) {
    return "#ffffff";
  } else {
    return color[randomColorNum];
  }


export default Tag;
