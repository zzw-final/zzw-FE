import Profile from "../components/mypage/Profile";
import EditProfile from "../components/mypage/EditProfile";
import Modal from "../components/UI/Modal";
import EditProfileImage from "../components/mypage/EditProfileImage";
import TogglePosts from "../components/mypage/TogglePosts";
import MyRecipes from "../components/posts/MyRecipes";
import LikeRecipes from "../components/posts/LikeRecipes";
import LayoutPage from "../components/common/LayoutPage";
import useInfinity from "../hooks/useInfinity";
import Spinner from "../components/UI/Spinner";
import { useEffect, useState } from "react";
import { options } from "../api/options";
import { fetchProfile, fetchMyRecipes, fetchLikeRecipes, editApi } from "../api/mypage";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { setCookie, getCookie } from "../util/cookie";
import { useInView } from "react-intersection-observer";

export const vaildNickname = /^(?=.*[가-힣])[가-힣]{2,6}$/;

const MyPage = () => {
  const [myVisible, setMyVisible] = useState(true);
  const [likeVisible, setLikeVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const { ref, inView } = useInView();

  const {
    data: likeRecipes,
    fetchNextPage,
    hasNextPage,
    isLoading: loadingLikeRecipes,
  } = useInfinity(["mypage", "likeRecipes"], fetchLikeRecipes, {
    enabled: likeVisible,
  });

  const { data: userData, isLoading: loadingUserData } = useQuery(
    ["mypage", "profile"],
    fetchProfile,
    options.eternal
  );

  const { data: myRecipes, isLoading: loadingMyRecipes } = useQuery(
    ["mypage", "myRecipes"],
    fetchMyRecipes,
    options.eternal
  );

  useEffect(() => {
    if (inView && hasNextPage && likeVisible) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage, likeVisible]);

  const likeRecipeClick = () => {
    setMyVisible(false);
    setLikeVisible(true);
  };

  const myRecipeClick = () => {
    setMyVisible(true);
    setLikeVisible(false);
  };

  const { mutate: nicknameMutate } = useMutation(
    (newNickname) => editApi.editNickname(newNickname),
    {
      onSuccess: (res, nickname) => {
        setCookie("loginNickname", nickname);
        queryClient.invalidateQueries(["mypage", "profile"]);
      },
    }
  );

  const nicknameEditHandler = (newNickname) => {
    if (getCookie("loginNickname") === newNickname) {
      setEditMode((prev) => !prev);
      return;
    }
    if (vaildNickname.test(newNickname)) {
      nicknameMutate(newNickname);
      setEditMode((prev) => !prev);
    } else {
      alert("닉네임은 한글 최대 여섯 자까지 허용됩니다");
    }
  };

  const editHandler = () => {
    setEditMode((prev) => !prev);
  };

  if (loadingLikeRecipes || loadingUserData || loadingMyRecipes) return <Spinner />;

  return (
    <LayoutPage>
      {userData && !editMode && <Profile userData={userData} editHandler={editHandler} />}
      {userData && editMode && (
        <EditProfile
          userData={userData}
          nicknameEditHandler={nicknameEditHandler}
          setModalIsOpen={setModalIsOpen}
          nicknameMutate={nicknameMutate}
        />
      )}
      <TogglePosts
        onClickLikeRecipe={likeRecipeClick}
        onClickMyRecipe={myRecipeClick}
        myVisible={myVisible}
        likeVisible={likeVisible}
      />
      {myVisible && <MyRecipes myRecipes={myRecipes} />}
      {likeVisible && <LikeRecipes likeRecipes={likeRecipes} recipeRef={ref} />}
      {modalIsOpen && (
        <Modal setModalIsOpen={setModalIsOpen}>
          <EditProfileImage setModalIsOpen={setModalIsOpen} />
        </Modal>
      )}
    </LayoutPage>
  );
};

export default MyPage;
