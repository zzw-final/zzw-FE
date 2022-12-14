import React, { useState } from "react";
import styled from "styled-components";
import LayoutPage from "../components/common/LayoutPage";
import Logo from "../components/common/Logo";
import Main from "../components/main/Main";
import SearchForm from "../components/main/SearchForm";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import Toast from "../components/UI/Toast";
import { options } from "../api/options";
import { fetchBestList, fetchBestTagTopFive, fetchRecentList } from "../api/mainpage";
import { getCookie } from "../util/cookie";

const MainPage = () => {
  const [toast, setToast] = useState(false);
  const loginNickname = getCookie("loginNickname");

  const navigate = useNavigate();
  const { data: tagList } = useQuery(["mainPage", "tagList"], fetchBestTagTopFive, options.eternal);
  const { data: bestPost } = useQuery(["mainPage", "bestPost"], fetchBestList, options.eternal);
  const { data: recentPost } = useQuery(
    ["mainPage", "recentPost"],
    loginNickname ? fetchRecentList : () => {},
    options.eternal
  );

  const search = async (searchOption, sendData) => {
    navigate(`/search?${searchOption}=${sendData}`);
  };

  const showToast = () => {
    setToast(true);
  };

  return (
    <LayoutPage background={"var(--color-main-light-orange)"}>
      <Logo />
      <SearchForm mainSearch={search} showToast={showToast} />
      <MainContainer>
        {toast && <Toast setToast={setToast} text="태그는 5개까지 검색 가능합니다." />}
        <Main tagList={tagList} bestPost={bestPost} recentPost={recentPost} search={search} />
      </MainContainer>
    </LayoutPage>
  );
};

const MainContainer = styled.div`
  display: block;
`;

export default MainPage;
