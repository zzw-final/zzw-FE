import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { instance } from "../api/request";
import LayoutPage from "../components/common/LayoutPage";
import FollowerList from "../components/followpage/FollowerList";
import FollowLayout from "../components/followpage/FollowLayout";
import FollowList from "../components/followpage/FollowList";

const FollowPage = () => {
  const [followList, setFollowList] = useState();
  const [followerList, setFollowerList] = useState();
  const { id } = useParams();
  const location = useLocation();
  const isClick = location.state.isClick;
  const nickname = location.state.nickname;
  const [click, setClick] = useState(isClick);
  const [followView, setFollowView] = useState(true);
  const [followerView, setFollowerView] = useState(false);

  const followTest = async () => {
    console.log("몇번이나 찍히고있나 :>> ");
    if (!id) {
      return await instance.get(`/api/auth/mypage/follow`);
    } else {
      return await instance.get(`/api/mypage/${id}/follow`);
    }
  };

  const { data } = useQuery("follow", followTest);
  console.log("data", data);

  useEffect(() => {
    console.log("데이터 페칭 테스트");
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
    fetchFollow();
  }, [id]);

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
