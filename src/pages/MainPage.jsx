import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { instance } from "../api/request";
import styled from "styled-components";
import LayoutPage from "../components/common/LayoutPage";
import Logo from "../components/common/Logo";
import Main from "../components/main/Main";
import MainSearch from "../components/main/MainSearch";
import SearchForm from "../components/main/SearchForm";

const MainPage = () => {
  const [bestPost, setBestPost] = useState();
  const [recentPost, setRecentPost] = useState();
  const [tagList, setTagList] = useState();
  const [followList, setFollowList] = useState();
  const [searchResultList, setSearchResultList] = useState([]);
  // const [likeToggleBtn, setLikeToggleBtn] = useState();
  // const [cookies] = useCookies(["loginNickname"]);
  // const loginNickname = cookies.loginNickname;

  useEffect(() => {
    async function fetchData() {
      const result = await instance.get(`/api/post`);
      if (result.data.success && result.data.error === null) {
        setBestPost(result.data.data.bestPost);
        setRecentPost(result.data.data.recentPost);
        setTagList(result.data.data.tagList);
        setFollowList(result.data.data.followPost);
      }
    }
    fetchData();
  }, []);

  const likeToggle = async (postId) => {
    return await instance.post(`/api/auth/post/${postId}`);
  };

  const search = async (searchOption, sendData) => {
    let requestUrl = "";
    switch (searchOption) {
      case "tag":
        requestUrl = `/api/post/filter/tag`;
        break;
      case "title":
        requestUrl = `/api/post/filter/title`;
        break;
      case "nickname":
        requestUrl = `/api/post/filter/nickname`;
        break;
      default:
        console.log(`${searchOption} 는 가능한 선택 옵션이 아닙니다.`);
        break;
    }
    const resultSearch = await instance.post(requestUrl, sendData);
    setSearchResultList(resultSearch.data.data);
  };

  // console.log("bestPost > ", bestPost);
  console.log("searchResultList > ", searchResultList);

  return (
    <LayoutPage background={"background.jpeg"}>
      <Logo />
      <SearchForm search={search} />
      <MainSearchContainer>
        <MainSearch tagList={tagList} searchResultList={searchResultList} />
      </MainSearchContainer>
      <MainContainer>
        <Main
          bestPost={bestPost}
          recentPost={recentPost}
          tagList={tagList}
          followList={followList}
          likeToggle={likeToggle}
        />
      </MainContainer>
    </LayoutPage>
  );
};

const MainContainer = styled.div`
  display: block;
  /* display: none; */
`;

const MainSearchContainer = styled.div`
  display: none;
  /* display: block; */
`;

export default MainPage;
//
