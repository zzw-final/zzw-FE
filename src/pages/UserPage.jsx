import React, { useEffect, useState } from "react";
import Profile from "../components/mypage/Profile";
import Button from "../components/UI/Button";
import MyRecipes from "../components/posts/MyRecipes";
import { instance } from "../api/request";
import LayoutPage from "../components/common/LayoutPage";
import { useNavigate, useParams } from "react-router-dom";

function UserPage() {
  const { id } = useParams();
  const [anotherUserData, setAnotherUserData] = useState();
  const [userRecipe, setUserRecipe] = useState();
  const navigate = useNavigate();

  const likeToggle = async (postId) => {
    return await instance.post(`/api/auth/post/${postId}`);
  };

  useEffect(() => {
    async function fetchUserData() {
      const res = await instance.get(`/api/mypage/${id}`);
      const userData = res.data.data;
      setAnotherUserData(userData);
    }
    fetchUserData();
  }, [id]);

  useEffect(() => {
    async function fetchUserRecipe() {
      const res = await instance.get(`/api/mypage/${id}/myposts`);
      const userData = res.data.data;
      setUserRecipe(userData);
    }
    fetchUserRecipe();
  }, [id]);

  const DmRequest = async () => {
    const res = await instance.get(`/api/mypage/${id}/chat`);
    if (res.data.data) {
      navigate(`/chat/${res.data.data.roomId}`);
    }
  };

  return (
    <LayoutPage>
      {anotherUserData && (
        <Profile userData={anotherUserData} DmRequestHandler={DmRequest} />
      )}
      <Button style={{ margin: `0.7rem` }} name="MyToggleBtn" myVisible={true}>
        {anotherUserData?.nickname} 님의 레시피 🍳
      </Button>
      <MyRecipes
        onLikeHandler={likeToggle}
        myRecipes={userRecipe}
        userNickname={anotherUserData?.nickname}
      />
    </LayoutPage>
  );
}

export default UserPage;
