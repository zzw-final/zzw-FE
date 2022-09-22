import React from "react";
import styled from "styled-components";

const Tag = ({ tagName }) => {
  return <TagContainer color={randomColor()}>{tagName}</TagContainer>;
};

const TagContainer = styled.p`
  font-size: var(--font-small);
  background-color: ${(props) => props.color};
  padding: 0.1rem 0.3rem;
  border-radius: 20px;
  height: 20px;
`;

function randomColor() {
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

  return color[randomColorNum];
}

export default Tag;
