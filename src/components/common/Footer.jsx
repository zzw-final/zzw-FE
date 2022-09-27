import React, { useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import styled from "styled-components";
import HomeIcon from "@mui/icons-material/Home";
import CreateIcon from "@mui/icons-material/Create";
import PersonIcon from "@mui/icons-material/Person";
import TagIcon from "@mui/icons-material/Tag";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const [toggleTagList, setToggleTagList] = useState(false);
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  const goWrite = () => {
    navigate("/write");
  };

  const goMypage = () => {
    navigate("/mypage");
  };

  const openTagBox = () => {
    setToggleTagList(!toggleTagList);
  };

  return (
    <>
      <FooterContainer>
        <BottomNavigation
          sx={{ width: 500 }}
          value={window.location.pathname || "/"}
        >
          <BottomNavigationAction
            label="Home"
            value="/"
            icon={<HomeIcon />}
            onClick={goHome}
          />
          <BottomNavigationAction
            label="Write"
            value="/write"
            icon={<CreateIcon />}
            onClick={goWrite}
          />
          <BottomNavigationAction
            label="Mypage"
            value="/mypage"
            icon={<PersonIcon />}
            onClick={goMypage}
          />
          <BottomNavigationAction
            label="Tag"
            value="tag"
            icon={<TagIcon />}
            // className="openTagList"
            onClick={openTagBox}
          />
        </BottomNavigation>
      </FooterContainer>
      <TagList id="tagList" top={toggleTagList}></TagList>
    </>
  );
};

const FooterContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  height: 56px;
  position: fixed;
  bottom: 0;
  z-index: 1;
`;

const TagList = styled.div`
  background-color: rgba(60, 60, 60, 0.888);
  width: 100%;
  height: 75%;
  margin: 0;
  padding: 0;
  transition: all 600ms cubic-bezier(0.86, 0, 0.07, 1);
  top: ${({ top }) => (top ? "22%" : "100%")};
  position: fixed;
  left: 0;
`;

export default Footer;
