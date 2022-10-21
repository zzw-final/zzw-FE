import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import HomeIcon from "@mui/icons-material/Home";
import CreateIcon from "@mui/icons-material/Create";
import PersonIcon from "@mui/icons-material/Person";
import TagIcon from "@mui/icons-material/Tag";
import TextsmsIcon from "@mui/icons-material/Textsms";
import * as StompJs from "@stomp/stompjs";
import { getCookie } from "../../util/cookie";
import Badge from "@mui/material/Badge";
import { fetchAlarm } from "../../api/request";
import TagSearch from "./TagSearch";
import Slide from "../UI/Slide";

const Footer = ({ topTenTagList, tagAllList }) => {
  const [newChatText, setNewChatText] = useState();
  const [cookies] = useCookies(["loginNickname", "loginUserId"]);
  const [slideIsOpen, setSlideIsOpen] = useState(false);

  const pathName = window.location.pathname;
  const loginNickname = cookies.loginNickname;
  const loginUserId = cookies.loginUserId;

  const navigate = useNavigate();

  const client = useRef({});

  useEffect(() => {
    fetchAlarm().then((res) => setNewChatText(res.data.data.isRead));
    connect();
    return () => disconnect();
  }, []);

  const toggleTagBox = () => {
    setSlideIsOpen(!slideIsOpen);
  };

  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL: `wss://${process.env.REACT_APP_CHAT_API}/zzw`,
      connectHeaders: {
        Authorization: getCookie("accessToken"),
        oauth: getCookie("loginOauth"),
      },
      // debug: (str) => {
      //   console.log(str);
      // },
      reconnectDelay: 100,
      onConnect: () => {
        subscribe();
      },
    });
    client.current.activate();
  };

  const disconnect = () => {
    client.current.deactivate();
  };

  const subscribe = () => {
    client.current.subscribe(`/sub/chat/member/${loginUserId}`, (res) => {
      const body = JSON.parse(res.body);
      setNewChatText(body.isRead);
    });
  };

  const loginConfirm = (url) => {
    if (!loginNickname) {
      if (window.confirm("로그인 사용자만 이용할 수 있습니다. 로그인 하시겠습니까?")) {
        navigate("/login");
        return;
      }
    } else {
      navigate(url);
    }
  };

  const changeColor = (id) => {
    document.querySelector(`#${id}`).style.color = "var(--color-real-light-orange)";
  };

  useEffect(() => {
    const possibleNav = ["/chatlist", "/", "/write", "/mypage"];
    if (possibleNav.includes(pathName)) {
      const changeNav = pathName.split("/")[1];
      if (changeNav === "") {
        changeColor("home");
        return;
      }
      changeColor(changeNav);
    }
  }, [pathName]);

  const goHome = () => {
    navigate("/");
  };

  const goChatList = () => {
    changeColor("chatlist");
    loginConfirm("/chatlist");
  };

  const goWrite = () => {
    changeColor("write");
    loginConfirm("/write");
  };

  const goMypage = () => {
    changeColor("mypage");
    loginConfirm("/mypage");
  };

  return (
    <>
      <FooterContainer>
        <FooterIcon id="chatlist" onClick={goChatList}>
          {!newChatText ? (
            <Badge badgeContent="N" color="warning">
              <TextsmsIcon sx={{ fontSize: 30 }} />
            </Badge>
          ) : (
            <TextsmsIcon sx={{ fontSize: 30 }} />
          )}
        </FooterIcon>
        <FooterIcon onClick={toggleTagBox}>
          <TagIcon sx={{ fontSize: 30 }} />
        </FooterIcon>
        <FooterIcon id="home" onClick={goHome}>
          <HomeIcon sx={{ fontSize: 30 }} />
        </FooterIcon>
        <FooterIcon id="write" onClick={goWrite}>
          <CreateIcon sx={{ fontSize: 30 }} />
        </FooterIcon>
        <FooterIcon id="mypage" onClick={goMypage}>
          <PersonIcon sx={{ fontSize: 30 }} />
        </FooterIcon>
      </FooterContainer>
      {slideIsOpen && (
        <Slide setSlideIsOpen={setSlideIsOpen}>
          <TagSearch setSlideIsOpen={setSlideIsOpen} topTenTagList={topTenTagList} tagAllList={tagAllList} />
        </Slide>
      )}
    </>
  );
};

const FooterContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  height: 60px;
  border-top: 1px solid var(--color-orange);
  position: fixed;
  bottom: 0;
  z-index: 2;
  background-color: var(--color-white);
`;

const FooterIcon = styled.div`
  color: ${({ color }) => color || "var(--color-light-orange)"};
`;

export default Footer;
