import React, { useEffect } from "react";
import Footer from "./Footer";
import styled from "styled-components";
import { instance } from "../../api/request";
import { useState } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Button from "../UI/Button";
import IosShareIcon from "@mui/icons-material/IosShare";

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
}) => {
  const [topTenTagList, setTopTenTagList] = useState();
  const [tagAllList, setTagAllList] = useState();
  const pathName = window.location.pathname;
  const navigate = useNavigate();

  console.log("pathName :>> ", pathName);

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
    navigate(-1);
  };

  return (
    <LayoutPageContainer>
      {pathName !== "/" && pathName !== "/mypage" && pathName !== "/search" ? (
        <>
          <Header>
            <BackBtn>
              {backBtnTypeArrow ? (
                <KeyboardBackspaceIcon onClick={back} />
              ) : (
                <ChevronLeftIcon
                  onClick={back}
                  color="warning"
                  fontSize="large"
                />
              )}
            </BackBtn>
            {headerTitle}
            <AddBtn>
              {isShare ? <IosShareIcon color="warning" /> : ""}
              {isBtn ? (
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
              ) : (
                ""
              )}
            </AddBtn>
          </Header>
        </>
      ) : (
        ""
      )}
      <Wrapper background={background} backgroundMain={backgroundMain}>
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
`;

const Wrapper = styled.div`
  width: 100%;
  overflow: hidden;
  background-color: ${({ background }) => background || "white"};
  background: linear-gradient(
    var(${({ backgroundMain }) => backgroundMain}) 50%,
    var(--color-white) 50%
  );
`;

export default LayoutPage;
