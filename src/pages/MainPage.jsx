import React, { useEffect, useState } from "react";
import { instance } from "../api/request";
import styled from "styled-components";
import LayoutPage from "../components/common/LayoutPage";
import Logo from "../components/common/Logo";
import Main from "../components/main/Main";
import SearchForm from "../components/main/SearchForm";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const [bestPost, setBestPost] = useState();
  const [recentPost, setRecentPost] = useState();
  const [tagList, setTagList] = useState();
  const [followPost, setFollowPost] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const result = await instance.get(`/api/post`);
      if (result.data.success && result.data.error === null) {
        setBestPost(result.data.data.bestPost);
        setRecentPost(result.data.data.recentPost);
        setTagList(result.data.data.tagList);
        setFollowPost(result.data.data.followPost);
      }
    }
    fetchData();
  }, []);

  const likeToggle = async (postId) => {
    return await instance.post(`/api/auth/post/${postId}`);
  };

  const search = async (searchOption, sendData) => {
    // console.log("main search :>> ", searchOption, sendData);
    navigate(`/search?${searchOption}=${sendData}`);
  };

  return (
    <LayoutPage background={"background.jpeg"}>
      <Logo />
      <SearchForm mainSearch={search} />
      <MainContainer>
        <Main
          bestPost={bestPost}
          recentPost={recentPost}
          tagList={tagList}
          followPost={followPost}
          likeToggle={likeToggle}
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
