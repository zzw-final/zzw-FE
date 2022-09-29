import React, { useState, useEffect } from "react";
import { instance } from "../api/request";
import LayoutPage from "../components/common/LayoutPage";
import FollowerList from "../components/followpage/FollowerList";
import FollowLayout from "../components/followpage/FollowLayout";
import FollowList from "../components/followpage/FollowList";
import { useLocation } from "react-router-dom";

const FollowPage = () => {
  const [followList, setFollowList] = useState();
  const [followerList, setFollowerList] = useState();
  const location = useLocation();
  const isClick = location.state.isClick;
  const [click, setClick] = useState(isClick);
  const [followView, setFollowView] = useState(true);
  const [followerView, setFollowerView] = useState(false);

  async function fetchFollow() {
    const res = await instance.get(`/api/auth/mypage/follow`);
    const follow = res.data.data;
    setFollowList(follow);
  }

  useEffect(() => {
    fetchFollow();
  }, []);

  const fetchFollower = async () => {
    if (followerList === undefined) {
      const res = await instance.get(`/api/auth/mypage/follower`);
      const follower = res.data.data;
      setFollowerList(follower);
    }
    setFollowView(false);
    setFollowerView(true);
  };

  if (click) {
    fetchFollower();
    setClick(false);
  }

  const toggleHandler = () => {
    setFollowView(true);
    setFollowerView(false);
  };

  const followHandler = async (userId) => {
    return await instance.post(`/api/auth/mypage/follow/${userId}`);
  };

  return (
    <LayoutPage>
      <FollowLayout
        onFetchFollower={fetchFollower}
        onToggleHandler={toggleHandler}
        followView={followView}
        followerView={followerView}
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
