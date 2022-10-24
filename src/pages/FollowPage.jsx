import LayoutPage from "../components/common/LayoutPage";
import FollowerList from "../components/followpage/FollowerList";
import FollowLayout from "../components/followpage/FollowLayout";
import FollowList from "../components/followpage/FollowList";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useLocation, useParams } from "react-router-dom";
import { options } from "../api/options";
import {
  fetchFollow,
  fetchMyFollow,
  fetchFollower,
  fetchMyFollower,
  followHandler,
} from "../api/followpage";
import { getCookie } from "../util/cookie";
import Spinner from "../components/UI/Spinner";

const FollowPage = () => {
  const { id } = useParams();
  const { state: location } = useLocation();
  const { isClick, follow, follower, nickname } = location;
  const [click, setClick] = useState(isClick);
  const [followView, setFollowView] = useState(follow);
  const [followerView, setFollowerView] = useState(follower);
  const queryClient = useQueryClient();
  const loginNickname = getCookie("loginNickname");

  const { data: followList, isLoading: loadingFollowList } = useQuery(
    ["follow", id ? id : "0"],
    id ? () => fetchFollow(id) : fetchMyFollow,
    {
      ...options.eternal,
      enabled: !click,
    }
  );
  const { data: followerList, isLoading: loadingFollowerList } = useQuery(
    ["follower", id ? id : "0"],
    id ? () => fetchFollower(id) : fetchMyFollower,
    {
      ...options.eternal,
      enabled: !!click,
    }
  );

  // 팔로우 버튼을 눌렀다면
  const followBtn = () => {
    setFollowView(true); // 팔로우 목록을 보이게 하고
    setFollowerView(false); // 팔로워 목록은 숨기고
    setClick(false); // 클릭 상태는 false로(follow data fetch enabled option)
  };

  // 팔로워 버튼을 눌렀다면
  const followerBtn = () => {
    setFollowView(false); // 팔로우 목록은 숨기고
    setFollowerView(true); // 팔로워 목록을 보이게 하고
    setClick(true); // 클릭 상태는 true로(follower data fetch enabled option)
  };

  const { mutate } = useMutation((userId) => followHandler(userId), {
    onSuccess: (res) => {
      if (res.data.data.isGet) alert("🎉 새로운 칭호를 획득했습니다! 마이페이지에서 확인하세요.");
      queryClient.invalidateQueries(["userpage", "profile"]);
      queryClient.invalidateQueries(["mypage", "profile"]);
      queryClient.invalidateQueries(["follow"]);
      queryClient.invalidateQueries(["follower"]);
      queryClient.invalidateQueries(["mainPage", "infinite"]);
    },
  });

  if (loadingFollowList || loadingFollowerList) return <Spinner />;

  return (
    <LayoutPage headerTitle={id ? nickname : loginNickname}>
      <FollowLayout
        onClickFollower={followerBtn}
        onClickfollow={followBtn}
        followView={followView}
        followerView={followerView}
        nickname={nickname}
      />
      <div style={{ marginBottom: "90px" }}>
        {followView && <FollowList followList={followList} mutate={mutate} />}
        {followerView && <FollowerList followerList={followerList} mutate={mutate} />}
      </div>
    </LayoutPage>
  );
};

export default FollowPage;
