import Profile from "../components/mypage/Profile";
import Button from "../components/UI/Button";
import MyRecipes from "../components/posts/MyRecipes";
import LayoutPage from "../components/common/LayoutPage";
import { useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchUserProfile, fetchUserRecipes, directMessage } from "../api/userpage";
import { options } from "../api/options";

function UserPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const profileRef = useRef();

  useEffect(() => {
    profileRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const { data: userData } = useQuery(
    ["userpage", "profile", id],
    () => fetchUserProfile(id),
    options.eternal
  );

  const { data: userRecipes } = useQuery(
    ["userpage", "recipes", id],
    () => fetchUserRecipes(id),
    options.eternal
  );

  const DmRequest = async () => {
    const res = await directMessage(id);
    if (res.data.data) {
      navigate(`/chat/${res.data.data.roomId}`, {
        state: {
          nickname: userData.nickname,
          grade: userData.grade,
          userId: id,
        },
      });
    }
  };

  return (
    <LayoutPage>
      {userData && (
        <Profile profileRef={profileRef} userData={userData} DmRequest={DmRequest} />
      )}
      <Button
        style={{ margin: `0.7rem` }}
        name="ProfileBtn"
        width="13rem"
        height="2rem"
        myVisible={true}
      >
        <span style={{ fontSize: "15px", marginRight: "3px" }}>🫕</span>
        {userData?.nickname} 님의 레시피
      </Button>
      <MyRecipes myRecipes={userRecipes} userNickname={userData?.nickname} />
    </LayoutPage>
  );
}

export default UserPage;
