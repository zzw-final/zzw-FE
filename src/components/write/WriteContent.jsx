import React, { useEffect } from "react";
import styled from "styled-components";

const WriteContent = ({ setContent, setImage, Image }) => {
  return (
    <Content>
      <input type="file" accept="image/*" />
    </Content>
  );
};
export default WriteContent;

const Content = styled.textarea`
  box-sizing: border-box;
  width: 340px;
  height: 30vh;
  margin-left: 20px;

  border: 1px solid #afadad;
  border-radius: 10px;
`;
