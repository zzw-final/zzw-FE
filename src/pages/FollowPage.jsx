import React, { useState, useEffect } from "react";
import { instance } from "../api/request";
import LayoutPage from "../components/common/LayoutPage";
import FollowerList from "../components/followpage/FollowerList";
import FollowLayout from "../components/followpage/FollowLayout";
import FollowList from "../components/followpage/FollowList";
import { useLocation, useParams } from "react-router-dom";

const FollowPage = () => {
  const [followList, setFollowList] = useState();
  const [followerList, setFollowerList] = useState();
  const location = useLocation();
  const isClick = location.state.isClick;
  const nickname = location.state.nickname;
  const [click, setClick] = useState(isClick);
  const [followView, setFollowView] = useState(true);
  const [followerView, setFollowerView] = useState(false);
  const { id } = useParams();

  async function fetchFollow() {
    if (!id) {
      const res = await instance.get(`/api/auth/mypage/follow`);
      const follow = res.data.data;
      setFollowList(follow);
    } else {
      const res = await instance.get(`/api/mypage/${id}/follow`);
      const follow = res.data.data;
      setFollowList(follow);
    }
  }

  useEffect(() => {
    fetchFollow();
  }, []);

  const fetchFollower = async () => {
    if (followerList === undefined) {
      if (!id) {
        const res = await instance.get(`/api/auth/mypage/follower`);
        const follower = res.data.data;
        setFollowerList(follower);
      } else {
        const res = await instance.get(`/api/mypage/${id}/follower`);
        const follower = res.data.data;
        setFollowerList(follower);
      }
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
