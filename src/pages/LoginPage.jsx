import React from "react";
import styled from "styled-components";
// import Logo from "../components/common/Logo";
import GoogleLogin from "../components/login/google/GoogleLogin";
import KakaoLogin from "../components/login/kakao/KakaoLogin";

const LoginPage = () => {
  return (
    <div>
      {/* <Logo /> */}
      <LoginText>로그인을 해주세요</LoginText>
      <LoginSelect>
        <KakaoLogin />
        <GoogleLogin />
      </LoginSelect>
    </div>
  );
};

const LoginText = styled.div`
  margin: auto;
  text-align: center;
  background-color: aqua;
`;

const LoginSelect = styled.div`
  text-align: center;
`;

export default LoginPage;
