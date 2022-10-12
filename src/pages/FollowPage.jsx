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

const FollowPage = () => {
  const { id } = useParams();
  const { state: location } = useLocation();
  const { isClick, follow, follower, nickname } = location;
  const [click, setClick] = useState(isClick);
  const [followView, setFollowView] = useState(follow);
  const [followerView, setFollowerView] = useState(follower);
  const queryClient = useQueryClient();

  const { data: followList } = useQuery(
    ["follow", id ? id : "0"],
    id ? () => fetchFollow(id) : fetchMyFollow,
    {
      ...options.eternal,
      enabled: !click,
    }
  );
  const { data: followerList } = useQuery(
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

  // mutate(팔로우/언팔로우) 성공시 해당 키값의 캐시 무효화
  // 다른 User의 리스트에서 mutate가 일어났다 -> 내가 누군가를 팔로우하거나 언팔로우했음을 의미
  // 따라서 내 팔로우 캐시도 무효화
  const { mutate } = useMutation((userId) => followHandler(userId), {
    onSuccess: () => {
      if (!click) {
        queryClient.invalidateQueries(["follow", id]);
        queryClient.invalidateQueries(["follow", "0"]);
      }
      if (!!click) {
        queryClient.invalidateQueries(["follower", id ? id : "0"]);
        queryClient.invalidateQueries(["follow", "0"]);
      }
    },
  });

  return (
    <LayoutPage>
      <FollowLayout
        onClickFollower={followerBtn}
        onClickfollow={followBtn}
        followView={followView}
        followerView={followerView}
        nickname={nickname}
      />
      <div style={{ height: "auto" }}>
        {followView && <FollowList followList={followList} mutate={mutate} />}
      </div>
      <div style={{ marginBottom: "60px", height: "auto" }}>
        {followerView && <FollowerList followerList={followerList} mutate={mutate} />}
      </div>
    </LayoutPage>
  );
};

export default FollowPage;
