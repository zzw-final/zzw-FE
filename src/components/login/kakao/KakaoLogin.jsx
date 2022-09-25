import React from "react";
import styled from "styled-components";

function KakaoLogin() {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`;

  return (
    <a href={KAKAO_AUTH_URL}>
      <KakaoLoginBtn src={"/kakaologin.png"} alt="kakaologin"></KakaoLoginBtn>
    </a>
  );
}

const KakaoLoginBtn = styled.img`
  width: 50px;
  height: 50px;
`;

export default KakaoLogin;
