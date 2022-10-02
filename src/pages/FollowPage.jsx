import React, { useState } from "react";
import { useQuery } from "react-query";
import { useLocation, useParams } from "react-router-dom";
import { instance } from "../api/request";
import LayoutPage from "../components/common/LayoutPage";
import FollowerList from "../components/followpage/FollowerList";
import FollowLayout from "../components/followpage/FollowLayout";
import FollowList from "../components/followpage/FollowList";

const FollowPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const isClick = location.state.isClick;
  const followClick = location.state.follow;
  const followerClick = location.state.follower;
  const nickname = location.state.nickname;
  const [click, setClick] = useState(isClick);
  const [followView, setFollowView] = useState(followClick);
  const [followerView, setFollowerView] = useState(followerClick);

  const fetchFollow = async () => {
    if (!id) {
      return await instance.get(`/api/auth/mypage/follow`);
    } else {
      return await instance.get(`/api/mypage/${id}/follow`);
    }
  };

  const fetchFollower = async () => {
    if (!id) {
      return await instance.get(`/api/auth/mypage/follower`);
    } else {
      return await instance.get(`/api/mypage/${id}/follower`);
    }
  };

  const follow = useQuery(["follow", id], fetchFollow, {
    enabled: !click, // 팔로우 진입시에만 받아옴
    staleTime: Infinity, // 항상 신선한 데이터로 취급
    select: (data) => data.data.data, // 요청 성공시 데이터 가공
  });
  const follower = useQuery(["follower", id], fetchFollower, {
    enabled: !!click, // 팔로워 진입시에만 받아옴
    staleTime: Infinity, // 항상 신선한 데이터로 취급
    select: (data) => data.data.data, // 요청 성공시 데이터 가공
  });

  const followList = follow?.data; // follow 가공 data를 followList로 선언
  const followerList = follower?.data; // follower 가공 data를 followerList로 선언

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

  const followHandler = async (userId) => {
    return await instance.post(`/api/auth/mypage/follow/${userId}`);
  };

  return (
    <LayoutPage>
      <FollowLayout
        onClickFollower={followerBtn}
        onClickfollow={followBtn}
        followView={followView}
        followerView={followerView}
        nickname={nickname}
      />
      {followView && (
        <FollowList followList={followList} onFollowHandler={followHandler} />
      )}
      {followerView && (
        <FollowerList followerList={followerList} onFollowHandler={followHandler} />
      )}
    </LayoutPage>
  );
};

export default FollowPage;
