import styled, { keyframes } from "styled-components";

import React from "react";

function Spinner() {
  return (
    <SpinnerContainer>
      <Spinners />
    </SpinnerContainer>
  );
}

export default Spinner;

const rotation = keyframes`
    from{transform: rotate(0deg)}
    to{transform: rotate(360deg)}
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: white;
`;

const Spinners = styled.div`
  height: 40px;
  width: 40px;
  border: 3px solid var(--color-orange);
  border-radius: 50%;
  border-top: none;
  border-right: none;
  margin: 20px auto;
  animation: ${rotation} 1s linear infinite;
  z-index: 10;
`;
