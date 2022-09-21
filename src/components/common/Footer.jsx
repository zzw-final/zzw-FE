import React, { useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import styled from "styled-components";
import HomeIcon from "@mui/icons-material/Home";
import CreateIcon from "@mui/icons-material/Create";
import PersonIcon from "@mui/icons-material/Person";
import TagIcon from "@mui/icons-material/Tag";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Footer = () => {
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

  return (
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
        <BottomNavigationAction label="Tag" value="tag" icon={<TagIcon />} />
      </BottomNavigation>
    </FooterContainer>
  );
};

const FooterContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 56px;
  position: relative;
  transform: translateY(-100%);
`;

export default Footer;
