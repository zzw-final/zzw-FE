import React, { useState, useEffect } from "react";
import { instance } from "../api/request";
import LayoutPage from "../components/common/LayoutPage";
import FollowerList from "../components/followpage/FollowerList";
import FollowLayout from "../components/followpage/FollowLayout";
import FollowList from "../components/followpage/FollowList";

const FollowPage = () => {
  const [followList, setFollowList] = useState();
  const [followerList, setFollowerList] = useState();
  const [followVisible, setfollowVisible] = useState(true);
  const [followerVisible, setFollowerVisible] = useState(false);

  useEffect(() => {
    async function fetchFollow() {
      const res = await instance.get(`/api/auth/mypage/follow`);
      const follow = res.data.data;
      setFollowList(follow);
    }
    fetchFollow();
  }, []);

  const fetchFollower = async () => {
    if (followerList === undefined) {
      const res = await instance.get(`/api/auth/mypage/follower`);
      const follower = res.data.data;
      setFollowerList(follower);
    }
    setfollowVisible(false);
    setFollowerVisible(true);
  };

  const toggleHandler = () => {
    setfollowVisible(true);
    setFollowerVisible(false);
  };

  return (
    <LayoutPage>
      <FollowLayout
        onFetchFollower={fetchFollower}
        onToggleHandler={toggleHandler}
        followVisible={followVisible}
        followerVisible={followerVisible}
      />
      {followVisible && <FollowList followList={followList} />}
      {followerVisible && <FollowerList followerList={followerList} />}
    </LayoutPage>
  );
};

export default FollowPage;
