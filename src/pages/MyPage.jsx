import React, { useEffect } from "react";
import Profile from "../components/mypage/Profile";
import TogglePosts from "../components/mypage/TogglePosts";
import Recipe from "../components/posts/Recipe";
import MyRecipes from "../components/posts/MyRecipes";
import { instance } from "../api/request";

const MyPage = () => {
  useEffect(() => {
    try {
      const res = instance.get(`/api/auth/mypage`);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <Profile />
      <TogglePosts />
      <Recipe />
      <MyRecipes />
    </>
  );
};

export default MyPage;
