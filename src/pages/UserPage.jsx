import React, { useEffect, useState } from "react";
import Profile from "../components/mypage/Profile";
import Button from "../components/UI/Button";
import MyRecipes from "../components/posts/MyRecipes";
import LikeRecipes from "../components/posts/LikeRecipes";
import { instance } from "../api/request";
import LayoutPage from "../components/common/LayoutPage";
import { useParams } from "react-router-dom";

function UserPage() {
  const { id } = useParams();
  const [anotherUserData, setAnotherUserData] = useState();
  const [userRecipe, setUserRecipe] = useState();

  useEffect(() => {
    async function fetchUserData() {
      try {
        const res = await instance.get(`/api/mypage/${id}`);
        const userData = res.data.data;
        setAnotherUserData(userData);
      } catch (error) {
        console.log("에러", error);
      }
    }
    fetchUserData();
  }, [id]);

  useEffect(() => {
    async function fetchUserRecipe() {
      try {
        const res = await instance.get(`/api/mypage/${id}/myposts`);
        const userData = res.data.data;
        setUserRecipe(userData);
      } catch (error) {
        console.log("에러", error);
      }
    }
    fetchUserRecipe();
  }, [id]);

  return (
    <LayoutPage>
      {anotherUserData && <Profile userData={anotherUserData} />}
      <Button style={{ margin: `0.7rem` }} name="MyToggleBtn" myVisible={true}>
        {anotherUserData?.nickname} 님의 레시피 🍳
      </Button>
      <MyRecipes myRecipes={userRecipe} />
    </LayoutPage>
  );
}

export default UserPage;
