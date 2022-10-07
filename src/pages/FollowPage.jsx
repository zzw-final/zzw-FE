import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
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

  const { data: followList } = useQuery(["follow", id ? id : "0"], fetchFollow, {
    enabled: !click, // 팔로우 진입시에만 받아옴
    cacheTime: 30 * 60 * 1000, // 캐시 30분 유지
    staleTime: Infinity, // 항상 신선한 데이터로 취급
    select: (data) => data.data.data, // 요청 성공시 데이터 가공
  });
  const { data: followerList } = useQuery(["follower", id ? id : "0"], fetchFollower, {
    enabled: !!click, // 팔로워 진입시에만 받아옴
    cacheTime: 30 * 60 * 1000, // 캐시 30분 유지
    staleTime: Infinity, // 항상 신선한 데이터로 취급
    select: (data) => data.data.data, // 요청 성공시 데이터 가공
  });

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

  const queryClient = useQueryClient();

  const followHandler = async (userId) => {
    return await instance.post(`/api/auth/mypage/follow/${userId}`);
  };

  // mutate(팔로우/언팔로우) 성공시 해당 키값의 캐시 무효화
  // 다른 User의 리스트에서 mutate가 일어났다 -> 내가 누군가를 팔로우하거나 언팔로우했음을 의미
  // 따라서 내 팔로우 캐시도 무효화 시킨다.
  const { mutate } = useMutation(followHandler, {
    onSuccess: () => {
      if (!click) {
        queryClient.invalidateQueries(["follow", id]);
        queryClient.invalidateQueries(["follow", "0"]);
      }
      if (!!click) {
        queryClient.invalidateQueries(["follower", id]);
        queryClient.invalidateQueries(["follow", "0"]);
      }
    },
  });

  console.log("click", click);

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
