import React, { useEffect } from "react";
import Footer from "./Footer";
import styled from "styled-components";
import { instance } from "../../api/request";
import { useState } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Button from "../UI/Button";
import IosShareIcon from "@mui/icons-material/IosShare";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";

const LayoutPage = ({
  children,
  background,
  backgroundMain,
  headerTitle,
  backBtnTypeArrow,
  isShare,
  isBtn,
  buttonText,
  buttonEvent,
  copyUrl,
  findUser,
}) => {
  const [topTenTagList, setTopTenTagList] = useState([]);
  const [tagAllList, setTagAllList] = useState([]);
  const [isHeader, setIsHeader] = useState(true);
  const pathName = window.location.pathname;
  const navigate = useNavigate();

  useEffect(() => {
    if (pathName === "/") setIsHeader(false);
    else if (pathName.includes("search")) setIsHeader(false);
    else if (pathName.includes("mypage")) setIsHeader(false);
  }, [pathName]);

  useEffect(() => {
    async function fetchData() {
      const result = await instance.get(`/api/post/filter`);
      if (result.data.success && result.data.error === null) {
        const tagNameList = result.data.data.map((item) => item.tagName);
        setTopTenTagList(tagNameList.slice(0, 30));
        setTagAllList(tagNameList.slice(31));
      }
    }
    fetchData();
  }, []);

  const back = () => {
    if (pathName === "/chatlist") navigate("/");
    else navigate(-1);
  };

  return (
    <LayoutPageContainer>

      {isHeader && (
        <Header>
          <BackBtn onClick={back}>
            {backBtnTypeArrow ? (
              <KeyboardBackspaceIcon />
            ) : (
              <ChevronLeftIcon color="warning" fontSize="large" />
            )}
          </BackBtn>
          {headerTitle}
          <AddBtn>
          {findUser ? (
                <PersonSearchIcon
                  onClick={() => {
                    navigate("/finduser");
                  }}
                />
              ) : (
                ""
              )}
            {isShare && (
              <IosShareIcon sx={{ marginRight: "9px" }} onClick={copyUrl} color="warning" />
            )}
            {isBtn && (
              <Button
                name="commonBtn"
                width="4rem"
                height="2rem"
                fontSize="var(--font-regular)"
                fontWeight="var(--weight-semi-bold)"
                color="var(--color-white)"
                backgroundColor="var(--color-real-light-orange)"
                onClick={buttonEvent}
              >
                {buttonText}
              </Button>
            )}
          </AddBtn>
        </Header>
      )}
      <Wrapper
        background={background}
        backgroundMain={backgroundMain}
        paddingTop={isHeader ? "80px" : ""}
      >
        <div>{children}</div>
      </Wrapper>
      <Footer topTenTagList={topTenTagList} tagAllList={tagAllList} />
    </LayoutPageContainer>
  );
};

const LayoutPageContainer = styled.div`
  position: relative;
  height: 100vh;
`;

const BackBtn = styled.span`
  position: absolute;
  left: 1.2rem;
`;

const AddBtn = styled.span`
  position: absolute;
  right: 1.2rem;
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  background-color: var(--color-main-light-orange);
  font-size: var(--font-medium-large);
  font-weight: var(--weight-semi-bold);
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 1;
`;

const Wrapper = styled.div`
  width: 100%;
  overflow: hidden;

  background-color: ${({ background }) => background || "var(--color-white)"};

  padding-top: ${({ paddingTop }) => paddingTop || 0};
`;

export default LayoutPage;
