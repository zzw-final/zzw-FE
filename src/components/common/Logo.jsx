import axios from "axios";
import React from "react";
import { useCookies } from "react-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { instance } from "../../api/request";

const Logo = () => {
  const navigate = useNavigate();
  const [cookies, , removeCookie] = useCookies([
    "accessToken",
    "refreshToken",
    "oauthToken",
    "loginUserId",
    "loginEmail",
    "loginNickname",
    "loginProfile",
  ]);

  const logout = () => {
    axios.get(`${process.env.REACT_APP_API}/api/member/kakao/logout`, {
      headers: {
        kakaoToken: cookies.oauthToken,
        withCredentials: true,
      },
    });
    removeCookie("accessToken");
    removeCookie("refreshToken");
    removeCookie("oauthToken");
    removeCookie("loginUserId");
    removeCookie("loginEmail");
    removeCookie("loginNickname");
    removeCookie("loginProfile");
    removeCookie("loginGrade");
    alert("로그아웃");
  };

  const unregister = async () => {
    const loginUserId = cookies.loginUserId;
    if (loginUserId && window.confirm("탈퇴 하시겠습니까?")) {
      const result = await instance.delete(`/api/member/resign/${loginUserId}`);
      logout();
      console.log("result unregister :>> ", result);
    } else return;
  };

  return (
    <>
      <LogoContainer>zzw.</LogoContainer>
      <LoginBox>
        {cookies.loginNickname || "로그인 유저 없음"}
        <button onClick={unregister}>회원탈퇴</button>
        <button onClick={logout}>로그아웃</button>
        <button
          onClick={() => {
            navigate("/login");
          }}
        >
          로그인
        </button>
      </LoginBox>
    </>
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
  color: var(--color-white);
  /* text-shadow: 2px 2px 4px var(--color-light-blu); */
  text-shadow: 1px 1px 2px black;
  margin-bottom: 0.3rem;
`;

const LoginBox = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

export default Logo;
