import React from "react";
import styled from "styled-components";

const WriteHeader = ({ submit }) => {
  return (
    <WriteHeaderdiv>
      <SubmitBtn onClick={submit}>등록</SubmitBtn>
    </WriteHeaderdiv>
  );
};

export default WriteHeader;

const WriteHeaderdiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
  margin: 2rem;
`;

const SubmitBtn = styled.button`
  grid-column-start: 3;
  width: 15vw;
  height: 4vh;
  border-radius: 10px;
  border: 0;
  outline: 0;
  margin: auto;
`;
