import axios from "axios";
import React from "react";
import { useCookies } from "react-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Logo = () => {
  const navigate = useNavigate();
  const [cookies, , removeCookie] = useCookies([
    "accessToken",
    "refreshToken",
    "kakaoToken",
    "loginUserId",
    "loginEmail",
    "loginNickname",
    "loginProfile",
  ]);
  const kakaoLogout = () => {
    axios.get(`${process.env.REACT_APP_API}/api/member/kakao/logout`, {
      headers: {
        kakaoToken: cookies.kakaoToken,
        withCredentials: true,
      },
    });
    removeCookie("accessToken");
    removeCookie("refreshToken");
    removeCookie("kakaoToken");
    removeCookie("loginUserId");
    removeCookie("loginEmail");
    removeCookie("loginNickname");
    removeCookie("loginProfile");
    removeCookie("loginGrade");
    alert("로그아웃");
  };
  return (
    <>
      <LogoContainer>zzw.</LogoContainer>
      로그인 유저 : {cookies.loginNickname || "로그인 유저 없음"}
      <button onClick={kakaoLogout}>로그아웃 임시</button>
      <button
        onClick={() => {
          navigate("/login");
        }}
      >
        로그인 임시
      </button>
    </>
  );
};

const LogoContainer = styled.div`
  /* background-color: lavender; */
  width: 100%;
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-size: 32px;
  font-weight: bold;
  color: var(--color-blue);
  /* text-shadow: 2px 2px 4px var(--color-light-blu); */
  /* text-shadow: 1px 1px 2px black; */
`;

export default Logo;
