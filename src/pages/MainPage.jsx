import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { instance } from "../api/request";
import LayoutPage from "../components/common/LayoutPage";
import Logo from "../components/common/Logo";
import Main from "../components/main/Main";
import SearchForm from "../components/main/SearchForm";

const MainPage = () => {
  const [bestPost, setBestPost] = useState();
  const [recentPost, setRecentPost] = useState();
  const [tagList, setTagList] = useState();
  const [followList, setFollowList] = useState();
  const [likeToggleBtn, setLikeToggleBtn] = useState();
  const [cookies] = useCookies(["loginNickname"]);
  const loginNickname = cookies.loginNickname;

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

  const getLikeItem = async (postId, isLike) => {
    // setRecentPost(
    //   bestPost.map((post) =>
    //     post.postId === postId ? { ...post, isLike: !post.isLike } : { ...post }
    //   )
    // );
    // setLikeToggleBtn(isLike);
    // if (loginNickname === undefined) {
    //   alert("로그인 유저만 사용 가능한 기능입니다.");
    //   return;
    // }
    // const resp = await likeToggle(postId);
    // const isVisible = resp.data.data;
    // if (isVisible) {
    //   setLikeToggleBtn(!likeToggleBtn);
    // }
    // return likeToggleBtn;
  };

  console.log("recentPost :>> ", recentPost);

  const likeToggle = async (postId) => {
    return await instance.post(`/api/auth/post/${postId}`);
  };

  return (
    <LayoutPage background={"1.jpeg"}>
      <Logo />
      <SearchForm />
      <Main
        bestPost={bestPost}
        recentPost={recentPost}
        tagList={tagList}
        followList={followList}
        likeToggle={likeToggle}
        getLikeItem={getLikeItem}
      />
    </LayoutPage>
  );
};

export default MainPage;
