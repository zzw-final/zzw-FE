import axios from "axios";
import React from "react";
import { useCookies } from "react-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { instance } from "../../api/request";
import TextsmsIcon from "@mui/icons-material/Textsms";

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
      await instance.delete(`/api/member/resign/${loginUserId}`);
      logout();
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
          <LogOutText onClick={logout}>Logout</LogOutText>
          <ChatListIcon onClick={chatList}>
            <TextsmsIcon />
            <NewChatMsg>!</NewChatMsg>
          </ChatListIcon>
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
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  width: 100%;
  position: absolute;
  top: 0;
  right: 0;
`;

const LogOutText = styled.p`
  font-size: var(--font-small);
  margin: 0.2rem;
`;

const ChatListIcon = styled.div`
  position: relative;
  color: var(--color-white);
`;

const NewChatMsg = styled.div`
  color: var(--color-orange);
  font-size: var(--font-reqular);
  background-color: var(--color-dark-pink);
  border-radius: 50%;
  width: 14px;
  height: 14px;
  text-align: center;
  line-height: 14px;
  position: absolute;
  top: -3px;
  right: -5px;
`;

export default Logo;
