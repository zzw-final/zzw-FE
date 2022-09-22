import React, { useEffect, useState } from "react";
import Profile from "../components/mypage/Profile";
import TogglePosts from "../components/mypage/TogglePosts";
import MyRecipes from "../components/posts/MyRecipes";
import { instance } from "../api/request";
import LayoutPage from "../components/common/LayoutPage";

const MyPage = () => {
  const [userData, setUserData] = useState();
  const [myRecipes, setMyRecipes] = useState();

  useEffect(() => {
    async function fetchProfileData() {
      try {
        const res = await instance.get(`/api/auth/mypage`);
        const userProfile = res.data.data;
        setUserData(userProfile);
      } catch (error) {
        console.log("에러", error);
      }
    }
    fetchProfileData();
  }, []);

  useEffect(() => {
    async function fetchMyRecipe() {
      try {
        const res = await instance.get(`/api/auth/mypage/myposts`);
        const myRecipes = res.data.data;
        setMyRecipes(myRecipes);
      } catch (error) {
        console.log("에러", error);
      }
    }
    fetchMyRecipe();
  }, []);

  return (
    <LayoutPage>
      <Profile userData={userData} />
      <TogglePosts />
      <MyRecipes myRecipes={myRecipes} />
    </LayoutPage>
  );
};

export default MyPage;
