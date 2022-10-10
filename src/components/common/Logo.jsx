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

  const loginNickname = cookies.loginNickname;

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
    removeCookie("loginOauth");
    removeCookie("setNickname");
    alert("로그아웃되었습니다.");
  };

  const unregister = async () => {
    const loginUserId = cookies.loginUserId;
    if (loginUserId && window.confirm("탈퇴 하시겠습니까?")) {
      const result = await instance.delete(`/api/member/resign/${loginUserId}`);
      logout();
      console.log("result unregister :>> ", result);
    } else return;
  };

  const chatList = () => {
    navigate("/chatlist");
  };

  return (
    <>
      <LogoContainer>zzw.</LogoContainer>
      {loginNickname ? (
        <LoginBox>
          {/* <button onClick={unregister}>회원탈퇴</button> */}
          <LogOutText onClick={logout}>Logout</LogOutText>
          <LogOutText onClick={chatList}>chatList</LogOutText>
        </LoginBox>
      ) : (
        ""
      )}
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

const LogOutText = styled.p`
  font-size: var(--font-small);
  margin: 0.2rem;
`;

export default Logo;
