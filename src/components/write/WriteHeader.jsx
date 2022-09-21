import React from "react";
import styled from "styled-components";

const WriteHeader = ({ onSubmitHandler }) => {
  return (
    <WriteHeaderdiv>
      <Logo>로고</Logo>
      <SubmitBtn onClick={onSubmitHandler}>등록</SubmitBtn>
    </WriteHeaderdiv>
  );
};

export default WriteHeader;

const WriteHeaderdiv = styled.div`
  display: flex;
  margin: 20px;
`;

const Logo = styled.div`
  margin: 16px;
`;

const SubmitBtn = styled.button`
  width: 50px;
  height: 30px;
  left: 332px;
  top: 16px;
  margin-left: 220px;
  margin-right: 10px;
  margin-top: 10px;

  background: var(--color-light-white);
  border-radius: 10px;
`;
