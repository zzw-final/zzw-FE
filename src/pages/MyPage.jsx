import React, { useEffect, useState } from "react";
import Profile from "../components/mypage/Profile";
import TogglePosts from "../components/mypage/TogglePosts";
import MyRecipes from "../components/posts/MyRecipes";
import LikeRecipes from "../components/posts/LikeRecipes";
import { instance } from "../api/request";
import LayoutPage from "../components/common/LayoutPage";

const MyPage = () => {
  const [userData, setUserData] = useState();
  const [myRecipes, setMyRecipes] = useState();
  const [likeRecipes, setLikeRecipes] = useState();
  const [myVisible, setMyVisible] = useState(true);
  const [likeVisible, setLikeVisible] = useState(false);

  useEffect(() => {
    async function fetchProfileData() {
      const res = await instance.get(`/api/auth/mypage`);
      const userProfile = res.data.data;
      setUserData(userProfile);
    }
    fetchProfileData();
  }, []);

  useEffect(() => {
    async function fetchMyRecipe() {
      const res = await instance.get(`/api/auth/mypage/myposts`);
      const myRecipes = res.data.data;
      setMyRecipes(myRecipes);
    }
    fetchMyRecipe();
  }, []);

  const fetchLikeRecipe = async () => {
    if (likeRecipes === undefined) {
      const res = await instance.get(`/api/auth/mypage/likeposts`);
      const LikeRecipes = res.data.data;
      setLikeRecipes(LikeRecipes);
    }
    setMyVisible(false);
    setLikeVisible(true);
  };

  const recipeHandler = () => {
    setMyVisible(true);
    setLikeVisible(false);
  };

  return (
    <LayoutPage>
      {userData && <Profile userData={userData} />}
      <TogglePosts
        onClickLikeRecipe={fetchLikeRecipe}
        onClickRecipeHandler={recipeHandler}
        myVisible={myVisible}
        likeVisible={likeVisible}
      />
      {myVisible && <MyRecipes myRecipes={myRecipes} />}
      {likeVisible && (
        <LikeRecipes likeRecipes={likeRecipes} setLikeRecipes={setLikeRecipes} />
      )}
    </LayoutPage>
  );
};

export default MyPage;
