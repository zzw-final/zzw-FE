import axios from "axios";
import React from "react";
import { useCookies } from "react-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { instance } from "../../api/request";
import TextsmsIcon from "@mui/icons-material/Textsms";
import { useEffect } from "react";
import { useState } from "react";

const Logo = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies([
    "accessToken",
    "refreshToken",
    "oauthToken",
    "loginUserId",
    "loginEmail",
    "loginNickname",
    "loginProfile",
  ]);

  const [newChatText, setNetChatText] = useState(false);

  const loginNickname = cookies.loginNickname;

  // 🥲 회원탈퇴
  // const unregister = async () => {
  //   const loginUserId = cookies.loginUserId;
  //   if (loginUserId && window.confirm("탈퇴 하시겠습니까?")) {
  //     await instance.delete(`/api/member/resign/${loginUserId}`);
  //     logout();
  //   } else return;
  // };

  const chatList = () => {
    navigate("/chatlist");
  };

  const chatAlarm = async () => {
    const result = await instance.get(`/api/chat/alarm`);
    setNetChatText(result.data.data.isRead);
  };

  useEffect(() => {
    chatAlarm();
  }, []);

  return (
    <>
      <LogoContainer>zzw.</LogoContainer>
      {loginNickname ? (
        <LoginBox>
          <ChatListIcon onClick={chatList}>
            <TextsmsIcon />
            <NewChatMsg>{!newChatText ? "N" : "0"}</NewChatMsg>
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
  text-shadow: 1px 1px 2px black;
  margin-bottom: 0.3rem;
`;

const LoginBox = styled.div`
  display: flex;
  padding: 1rem;
  position: absolute;
  top: 0;
  right: 1rem;
`;

const ChatListIcon = styled.div`
  position: relative;
  color: var(--color-white);
`;

const NewChatMsg = styled.div`
  color: var(--color-white);
  font-size: var(--font-micro);
  font-weight: var(--weight-bold);
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
