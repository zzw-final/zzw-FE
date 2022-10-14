import React, { useEffect, useState } from "react";
import { instance } from "../api/request";
import styled from "styled-components";
import LayoutPage from "../components/common/LayoutPage";
import Logo from "../components/common/Logo";
import Main from "../components/main/Main";
import SearchForm from "../components/main/SearchForm";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueries, useQuery, useQueryClient } from "react-query";
import Toast from "../components/UI/Toast";
// import { fetchBestList } from "../api/mainpage";
import { options } from "../api/options";
import {
  fetchBestList,
  fetchBestTagTopFive,
  fetchFollowListInfinite,
  fetchRecentList,
  fetchRecentListInfinite,
} from "../api/mainpage";
import { useCookies } from "react-cookie";

const MainPage = () => {
  const navigate = useNavigate();

  const [toast, setToast] = useState(false);
  const [cookies] = useCookies(["loginNickname"]);

  const loginNickname = cookies.loginNickname;

  const { data: tagList } = useQuery(
    "tagList",
    fetchBestTagTopFive,
    options.eternal
  );

  const { data: bestPost } = useQuery(
    "bestPost",
    fetchBestList,
    options.eternal
  );

  const { data: recentPost } = useQuery(
    "recentPost",
    loginNickname ? fetchRecentList : "",
    options.eternal
  );

  const { data: recentPostInfinite } = useQuery(
    "recentPostInfinite",
    loginNickname ? "" : () => fetchRecentListInfinite,
    options.eternal
  );

  const { data: followPost } = useQuery(
    "followPost",
    loginNickname ? () => fetchFollowListInfinite : "",
    options.eternal
  );

  const likeToggle = async (postId) => {
    return await instance.post(`/api/auth/post/${postId}`);
  };

  const search = async (searchOption, sendData) => {
    navigate(`/search?${searchOption}=${sendData}`);
  };

  const showToast = () => {
    setToast(true);
  };

  return (
    <LayoutPage backgroundMain={"--color-main-light-orange"}>
      <Logo />
      <SearchForm mainSearch={search} showToast={showToast} />
      <MainContainer>
        {toast && (
          <Toast
            setToast={setToast}
            text={"태그는 5개까지 검색 가능합니다."}
            margin="0.5rem"
          />
        )}
        <Main
          tagList={tagList}
          bestPost={bestPost}
          recentPost={recentPost}
          recentPostInfinite={recentPostInfinite && recentPostInfinite}
          followPost={followPost}
          likeToggle={likeToggle}
          search={search}
        />
      </MainContainer>
    </LayoutPage>
  );
};

const MainContainer = styled.div`
  display: block;
`;

export default MainPage;
//
