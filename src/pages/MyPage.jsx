import React, { useEffect, useState } from "react";
import Profile from "../components/mypage/Profile";
import TogglePosts from "../components/mypage/TogglePosts";
import Recipe from "../components/posts/Recipe";
import MyRecipes from "../components/posts/MyRecipes";
import { instance } from "../api/request";
import LayoutPage from "../components/common/LayoutPage";

const MyPage = () => {
  const [userData, setUserData] = useState();

  useEffect(() => {
    async function fetchProfileData() {
      try {
        await instance.get(`/api/auth/mypage`).then((res) => {
          const userData = res.data.data;
          setUserData(userData);
        });
      } catch (error) {
        console.log("에러", error);
      }
    }
    fetchProfileData();
  }, []);

  return (
    <LayoutPage>
      <Profile userData={userData} />
      <TogglePosts />
      <Recipe />
      <MyRecipes />
    </LayoutPage>
  );
};

export default MyPage;
