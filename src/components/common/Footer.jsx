import React, { useRef, useState } from "react";
import styled from "styled-components";
import HomeIcon from "@mui/icons-material/Home";
import CreateIcon from "@mui/icons-material/Create";
import PersonIcon from "@mui/icons-material/Person";
import TagIcon from "@mui/icons-material/Tag";
import { useNavigate } from "react-router-dom";
import Tag from "../../components/common/Tag";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import TextsmsIcon from "@mui/icons-material/Textsms";
import * as StompJs from "@stomp/stompjs";
import { getCookie } from "../../util/cookie";
import Badge from "@mui/material/Badge";

const Footer = ({ topTenTagList, tagAllList }) => {
  const [toggleTagList, setToggleTagList] = useState(false);
  const [searchTagList, setSearchTagList] = useState([]);
  const [searchHelpText, setSearchHelpText] = useState(false);
  const [newChatText, setNewChatText] = useState();
  const [cookies] = useCookies(["loginNickname"]);
  const loginUserId = getCookie("loginUserId");

  const pathName = window.location.pathname;
  const loginNickname = cookies.loginNickname;

  const navigate = useNavigate();

  const client = useRef({});

  useEffect(() => {
    connect();
    return () => disconnect();
  }, []);

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
      console.log("body :>> ", body.isRead);
      setNewChatText(body.isRead);
    });
  };

  const loginConfirm = (url) => {
    if (!loginNickname) {
      if (
        window.confirm(
          "로그인 사용자만 이용할 수 있습니다. 로그인 하시겠습니까?"
        )
      ) {
        navigate("/login");
        return;
      }
    } else {
      navigate(url);
    }
  };

  const changeColor = (id) => {
    document.querySelector(`#${id}`).style.color =
      "var(--color-real-light-orange)";
  };

  useEffect(() => {
    const changeNav = pathName.split("/")[1];
    if (changeNav === "") {
      changeColor("home");
      return;
    }
    changeColor(changeNav);
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

  const openTagBox = () => {
    setToggleTagList(!toggleTagList);
  };

  const onClickTagHandler = () => {
    navigate(`/search?tag=${searchTagList.toString()}`);
    setToggleTagList(!toggleTagList);
  };

  const addSearchTag = (tagName) => {
    if (searchTagList.includes(tagName)) {
      setSearchTagList(searchTagList.filter((tag) => tag !== tagName));
    } else {
      setSearchTagList((prev) => [...prev, tagName]);
    }
  };

  const deleteSelectedTag = (deleteTagName) => {
    setSearchTagList(searchTagList.filter((tag) => tag !== deleteTagName));
  };

  useEffect(() => {
    if (searchTagList.length !== 0 && searchTagList.length > 5)
      setSearchHelpText(true);
    else setSearchHelpText(false);
  }, [searchTagList]);

  useEffect(() => {
    if (toggleTagList) {
      document.body.style.cssText = `
        position: fixed;
        top: -${window.scrollY}px;
        overflow-y: scroll;
        width: 100%;`;
      return () => {
        const scrollY = document.body.style.top;
        document.body.style.cssText = "";
        window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
      };
    }
  }, [toggleTagList]);

  return (
    <>
      <FooterContainer>
        <FooterIcon id="chatlist" onClick={goChatList}>
          <Badge badgeContent={!newChatText ? "N" : "0"} color="warning">
            <TextsmsIcon sx={{ fontSize: 30 }} />
          </Badge>
        </FooterIcon>
        <FooterIcon onClick={openTagBox}>
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
      <TagList id="tagList" top={toggleTagList}>
        <TagListFoldLine onClick={openTagBox}></TagListFoldLine>
        <SearchBox>
          <TagBox>
            {searchTagList &&
              searchTagList?.map((tag, idx) => (
                <Tag
                  tagName={tag}
                  key={idx}
                  margin="5px"
                  isDelBtn={true}
                  delBtnClick={() => {
                    deleteSelectedTag(tag);
                  }}
                />
              ))}
          </TagBox>
          {searchTagList.length !== 0 ? (
            <>
              <SearchBtn onClick={onClickTagHandler} disabled={searchHelpText}>
                검색
              </SearchBtn>
              {searchHelpText ? (
                <SearchHelpText>최대 5개까지 선택 가능합니다.</SearchHelpText>
              ) : (
                ""
              )}
            </>
          ) : (
            <IntroText>냉장고 속 재료들을 클릭 하세요 🥬</IntroText>
          )}
        </SearchBox>
        <TagTitle>인기 Tags</TagTitle>
        <TagBox>
          {topTenTagList &&
            topTenTagList?.map((tag, idx) => (
              <Tag
                tagName={tag}
                key={idx}
                margin="6px"
                onClickHandler={() => {
                  addSearchTag(tag);
                }}
              />
            ))}
        </TagBox>
        <TagTitle>아래 태그도 검색해보세요</TagTitle>
        <TagBoxAll>
          {tagAllList &&
            tagAllList?.map((tag, idx) => (
              <Tag
                tagName={tag}
                key={idx}
                margin="6px"
                onClickHandler={() => {
                  addSearchTag(tag);
                }}
              />
            ))}
        </TagBoxAll>
      </TagList>
    </>
  );
};

const FooterContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 1.2rem 1rem 0 1rem;
  height: 90px;
  border-top: 1px solid var(--color-orange);
  position: fixed;
  bottom: 0;
  z-index: 1;
  background-color: var(--color-white);
`;

const FooterIcon = styled.div`
  color: ${({ color }) => color || "var(--color-light-orange)"};
`;

const TagListFoldLine = styled.div`
  width: 20%;
  height: 0.1rem;
  background-color: var(--color-white);
  margin: 0.5rem auto 2rem auto;
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 14vh;
  position: relative;
  z-index: 1;
`;

const IntroText = styled.div`
  color: var(--color-white);
  font-size: var(--font-medium);
  font-weight: bold;
  margin: 2rem 0;
  z-index: 1;
`;

const SearchBtn = styled.button`
  background-color: transparent;
  border: 1px solid var(--color-white);
  width: 6rem;
  padding: 0.3rem;
  margin: 1rem auto 0 auto;
  font-size: var(--font-medium);
  color: var(--color-white);
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
`;

const SearchHelpText = styled.p`
  font-size: var(--font-small);
  color: var(--color-light-orange);
  font-weight: bold;
  margin-top: 0.3rem;
  position: absolute;
  bottom: -25px;
`;

const TagList = styled.div`
  background-color: rgba(23, 23, 23, 0.888);
  width: 100%;
  height: 94vh;
  margin: 0;
  margin-bottom: 4rem;
  padding: 1rem 2rem 2rem 2rem;
  transition: all 600ms cubic-bezier(0.86, 0, 0.07, 1);
  top: ${({ top }) => (top ? "0%" : "100%")};
  position: fixed;
  left: 0;
  text-align: center;
  z-index: 1;
  overflow: scroll;
`;

const TagTitle = styled.div`
  color: var(--color-white);
  font-size: var(--font-medium);
  font-weight: bold;
  margin: 3rem 0 3rem 0;
`;

const TagBox = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const TagBoxAll = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default Footer;
