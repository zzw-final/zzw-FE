import React, { useEffect } from "react";
import styled from "styled-components";
import loginbackground from "../assets/loginbackground.png";
import Login from "../components/login/Login";

const LoginPage = () => {
  useEffect(() => {
    if (navigator.userAgent.includes("KAKAO"))
      alert("카카오 인앱 브라우저에서는 카카오 로그인만 가능해요!");
  }, []);

  return (
    <Container>
      <LoginBox>
        <Login />
        <LoginText>로그인하고 냉장고를 비워봐요!</LoginText>
      </LoginBox>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  width: 100vw;
  height: 100vh;
  background-image: url(${loginbackground});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100%;
  background-color: var(--color-login-yellow);
`;

const LoginBox = styled.div`
  position: absolute;
  bottom: 15%;
`;

const LoginText = styled.div`
  margin: 2rem;
  font-size: var(--font-medium-large);
  font-weight: var(--weight-bold);
  text-align: center;
`;

export default LoginPage;
