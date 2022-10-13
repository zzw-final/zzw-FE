import Profile from "../components/mypage/Profile";
import TogglePosts from "../components/mypage/TogglePosts";
import MyRecipes from "../components/posts/MyRecipes";
import LikeRecipes from "../components/posts/LikeRecipes";
import LayoutPage from "../components/common/LayoutPage";
import { useState } from "react";
import { options } from "../api/options";
import { fetchProfile, fetchMyRecipes, fetchLikeRecipes } from "../api/mypage";
import { useQuery } from "react-query";

const MyPage = () => {
  const [myVisible, setMyVisible] = useState(true);
  const [likeVisible, setLikeVisible] = useState(false);

  const { data: userData } = useQuery(
    ["mypage", "profile"],
    fetchProfile,
    options.eternal
  );

  const { data: myRecipes } = useQuery(
    ["mypage", "myRecipes"],
    fetchMyRecipes,
    options.eternal
  );

  const { data: likeRecipes } = useQuery(["mypage", "likeRecipes"], fetchLikeRecipes, {
    ...options.eternal,
    enabled: likeVisible,
  });

  const likeRecipeClick = () => {
    setMyVisible(false);
    setLikeVisible(true);
  };

  const myRecipeClick = () => {
    setMyVisible(true);
    setLikeVisible(false);
  };

  return (
    <LayoutPage>
      {userData && <Profile userData={userData} />}
      <TogglePosts
        onClickLikeRecipe={likeRecipeClick}
        onClickMyRecipe={myRecipeClick}
        myVisible={myVisible}
        likeVisible={likeVisible}
      />
      {myVisible && <MyRecipes myRecipes={myRecipes} />}
      {likeVisible && <LikeRecipes likeRecipes={likeRecipes} />}
    </LayoutPage>
  );
};

export default MyPage;
