import React from "react";
import styled from "styled-components";
import GoogleLogin from "../components/login/google/GoogleLogin";
import KakaoLogin from "../components/login/kakao/KakaoLogin";
import NaverLogin from "../components/login/naver/NaverLogin";

const LoginPage = () => {
  return (
    <Container>
      <LoginBox>
        <LoginText>로그인하고 냉장고를 비워봐요!</LoginText>
        <EmojiBox>
          <Emoji>
            <span style={{ letterSpacing: "-0.1rem" }}>🥬 + 🥓</span> = 🍲
          </Emoji>
          <Emoji>
            <span style={{ letterSpacing: "-0.1rem" }}>🧀 + 🍞</span> = 🥪
          </Emoji>
        </EmojiBox>
        <Line>Login with</Line>
        <LoginSelect>
          <KakaoLogin />
          <NaverLogin />
          <GoogleLogin />
        </LoginSelect>
      </LoginBox>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100vh;
  background: linear-gradient(170deg, #bffdff7b, #f8f8f8, #f8f8f8, #bffdff7b);
`;

const LoginBox = styled.div`
  width: 100%;
  position: absolute;
  text-align: center;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const EmojiBox = styled.div`
  margin-bottom: 5rem;
`;

const Emoji = styled.div`
  font-size: 50px;
  font-weight: var(--weight-bolder);
  color: #f6c5cc;
  text-align: center;
`;

const LoginText = styled.div`
  margin: 2rem;
  font-size: var(--font-medium-large);
  font-weight: var(--weight-bold);
  text-align: center;
`;

const Line = styled.div`
  display: flex;
  flex-basis: 100%;
  align-items: center;
  color: rgba(0, 0, 0, 0.3);
  font-weight: 200;
  font-family: "Roboto Slab", serif;
  margin: 20px auto 16px auto;

  &::before,
  &::after {
    content: "";
    flex-grow: 1;
    background: rgba(0, 0, 0, 0.3);
    height: 1px;
    font-size: 0px;
    line-height: 0px;
    margin: 0px 16px;
  }
`;

const LoginSelect = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 3rem;
`;

export default LoginPage;
