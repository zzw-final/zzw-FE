import React from "react";
import styled from "styled-components";

const Login = () => {
  const KAKAO_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`;
  const NAVER_URI = `https://nid.naver.com/oauth2.0/authorize?client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_NAVER_REDIRECT_URI}&state=${process.env.REACT_APP_NAVER_STATE}`;
  const GOOGLE_URI = `https://accounts.google.com/o/oauth2/v2/auth?scope=email%20openid&response_type=code&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}&client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}`;

  return (
    <>
      <a href={KAKAO_URI}>
        <LoginBtn src={"/kakaologin.png"} alt="kakaologin" />
      </a>
      <a href={NAVER_URI}>
        <LoginBtn src={"/naverlogin.png"} alt="naverlogin" />
      </a>
      <a href={GOOGLE_URI}>
        <LoginBtn src={"/googlelogin.png"} alt="googlelogin" />
      </a>
    </>
  );
};

const LoginBtn = styled.img`
  width: 50px;
  height: 50px;
  margin: 1rem;
`;

export default Login;
