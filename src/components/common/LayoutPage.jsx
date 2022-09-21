import React from "react";
import Footer from "./Footer";
import styled from "styled-components";

const LayoutPage = ({ children }) => {
  return (
    <>
      <Wrapper>
        <div>{children}</div>
      </Wrapper>
      <Footer />
    </>
  );
};

const Wrapper = styled.div`
  height: auto;
  min-height: 100vh;
  padding-bottom: 56px;
`;

export default LayoutPage;
