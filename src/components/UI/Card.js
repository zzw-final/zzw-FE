import React from "react";
import styled from "styled-components";

function Card({ children, ...props }) {
  return <PostBox {...props}>{children}</PostBox>;
}

export default Card;

const PostBox = styled.div`
  max-width: 220px;
  min-width: 160px;
  width: ${({ width }) => width || "175px"};
  height: ${({ height }) => height || "240px"};
  background-color: #fffffe;
  border-radius: 15px;
  box-shadow: 0px 0px 10px #dcdcdc;
  cursor: pointer;
  margin: ${({ margin }) => margin || "0px auto 10px auto"};
`;
