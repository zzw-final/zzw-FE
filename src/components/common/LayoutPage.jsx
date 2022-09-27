import React from "react";
import Footer from "./Footer";
import styled from "styled-components";

const LayoutPage = ({ children, background }) => {
  return (
    <>
      <Wrapper background={background}>
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
  background-image: url(${({ background }) => background});
  background-repeat: no-repeat;
  background-size: cover;
`;

export default LayoutPage;
