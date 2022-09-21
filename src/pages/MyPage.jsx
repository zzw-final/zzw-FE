import React from "react";
import Profile from "../components/mypage/Profile";
import TogglePosts from "../components/mypage/TogglePosts";
import Recipe from "../components/posts/Recipe";

const MyPage = () => {
  return (
    <>
      <Profile />
      <TogglePosts />
      <Recipe />
    </>
  );
};

export default MyPage;
