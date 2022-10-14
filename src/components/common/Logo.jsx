import { React } from "react";
import styled from "styled-components";

const Logo = () => {
  return (
    <LogoContainer>
      <LogoImg src="/logo.png" alt="logo" />
    </LogoContainer>
  );
};

const LogoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-size: 32px;
  font-weight: bold;
  color: var(--color-real-light-orange);
  text-shadow: 1px 1px 2px var(--color-orange);
  margin-bottom: 0.3rem;
`;

const LogoImg = styled.img`
  width: 6rem;
  padding-top: 1rem;
`;

export default Logo;
