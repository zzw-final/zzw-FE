import React, { useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import styled from "styled-components";
import HomeIcon from "@mui/icons-material/Home";
import CreateIcon from "@mui/icons-material/Create";
import PersonIcon from "@mui/icons-material/Person";
import TagIcon from "@mui/icons-material/Tag";
import { useNavigate } from "react-router-dom";
import Tag from "../../components/common/Tag";

const Footer = ({ topTenTagList, tagAllList }) => {
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

  const onClickTagHandler = (tagName) => {
    navigate(`/search?tag=${tagName}`);
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
      <TagList id="tagList" top={toggleTagList}>
        <TagListFoldLine></TagListFoldLine>
        <TagTitle>인기 Tags</TagTitle>
        <TagBox>
          {topTenTagList &&
            topTenTagList?.map((tag, idx) => (
              <Tag
                tagName={tag}
                key={idx}
                margin="5px"
                onClickHandler={() => {
                  onClickTagHandler(tag);
                }}
              />
            ))}
        </TagBox>
        <TagTitle>아래 태그도 검색해보세요</TagTitle>
        <TagBox>
          {tagAllList &&
            tagAllList?.map((tag, idx) => (
              <Tag
                tagName={tag}
                key={idx}
                margin="5px"
                onClickHandler={() => {
                  onClickTagHandler(tag);
                }}
              />
            ))}
        </TagBox>
      </TagList>
    </>
  );
};

const FooterContainer = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  height: 56px;
  position: fixed;
  bottom: 0;
  z-index: 1;
  background-color: var(--color-white);
`;

const TagListFoldLine = styled.div`
  width: 20%;
  height: 0.1rem;
  background-color: var(--color-white);
  margin: 0.5rem auto 2rem auto;
`;

const TagList = styled.div`
  background-color: rgba(23, 23, 23, 0.888);
  width: 100%;
  height: 75%;
  margin: 0;
  padding: 1rem 2rem 2rem 2rem;
  transition: all 600ms cubic-bezier(0.86, 0, 0.07, 1);
  top: ${({ top }) => (top ? "21%" : "100%")};
  border-radius: 1.5rem 1.5rem 0 0;
  position: fixed;
  left: 0;
  text-align: center;
`;

const TagTitle = styled.div`
  color: var(--color-white);
  font-size: var(--font-medium);
  font-weight: bold;
  margin-bottom: 1rem;
`;

const TagBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 3rem;
`;

export default Footer;
