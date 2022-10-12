import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../UI/Button";
import { instance } from "../../api/request";
import { useMutation, useQueryClient } from "react-query";
import { getCookie, removeCookie } from "../../util/cookie";

function Profile({ userData, DmRequestHandler }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const { follow, follower, grade, gradeList, nickname, profile, isFollow } = userData;
  const [greyButton, setGreyButton] = useState(isFollow);
  const [followerNum, setFollowerNum] = useState(follower);

  const logout = () => {
    const alert = window.confirm("로그아웃 하시겠습니까?");
    if (alert) {
      if (getCookie("loginOauth") === "kakao") {
        axios.get(`${process.env.REACT_APP_API}/api/member/kakao/logout`, {
          headers: {
            kakaoToken: getCookie("oauthToken"),
            withCredentials: true,
          },
        });
      }
      removeCookie("loginNickname");
      removeCookie("refreshToken");
      removeCookie("loginUserId");
      removeCookie("accessToken");
      removeCookie("oauthToken");
      removeCookie("loginGrade");
      removeCookie("loginProfile");
      removeCookie("loginOauth");
      removeCookie("loginEmail");
      navigate("/");
    }
    return null;
  };

  const deleteAccount = async () => {
    const loginUserId = getCookie("loginUserId");
    if (loginUserId && window.confirm("탈퇴하시겠습니까?")) {
      await instance.delete(`/api/member/resign/${loginUserId}`);
      logout();
    } else return;
  };

  const followHandler = async () => {
    return await instance.post(`/api/auth/mypage/follow/${id}`);
  };

  const queryClient = useQueryClient();

  const { mutate } = useMutation(followHandler, {
    onSuccess: (result) => {
      setGreyButton((prev) => !prev);
      if (result.data.data === "follow success") {
        setFollowerNum((prev) => prev + 1);
      }
      if (result.data.data === "unfollow success") {
        setFollowerNum((prev) => prev - 1);
      }
      queryClient.invalidateQueries(["follower", id]);
    },
  });

  const followClick = () => {
    if (!id) {
      navigate(`/follow`, {
        state: { isClick: false, follow: true, follower: false },
      });
    } else {
      navigate(`/follow/${id}`, {
        state: { isClick: false, follow: true, follower: false, nickname },
      });
    }
  };

  const followerClick = () => {
    if (!id) {
      navigate(`/follow`, {
        state: { isClick: true, follow: false, follower: true },
      });
    } else {
      navigate(`/follow/${id}`, {
        state: { isClick: true, follow: false, follower: true, nickname },
      });
    }
  };

  return (
    <Container>
      <div>
        <TopBox>
          <Img src={profile}></Img>
          <div>
            <NicknameBox>
              <Nickname>{nickname}</Nickname>
              <Grade>{grade}</Grade>
            </NicknameBox>
            <FollowBox>
              <Follow onClick={followClick}>
                <p>팔로우</p>
                <Num>{follow}</Num>
              </Follow>
              <Follow onClick={followerClick}>
                <p>팔로워</p>
                <Num>{followerNum}</Num>
              </Follow>
            </FollowBox>
          </div>
        </TopBox>
        {/* TODO: 칭호가 지나치게 많아지면 어떡할까 펼치기를 쓸까 */}
        <BottomBox>
          {gradeList?.map((grade, i) => (
            <Grades key={i}>{grade.gradeName}</Grades>
          ))}
        </BottomBox>
      </div>
      {!getCookie("loginUserId") ? null : !id ? (
        <Dm>
          <Button name="ProfileBtn" isFollow={true}>
            프로필 편집
          </Button>
          <Button
            onClick={logout}
            name="DmBtn"
            width="20%"
            background="gray"
            size="var(--font-small)"
          >
            Logout
          </Button>
        </Dm>
      ) : (
        <Dm>
          <Button onClick={mutate} name="ProfileBtn" isFollow={greyButton}>
            {greyButton ? "팔로잉" : "팔로우"}
          </Button>
          <Button name="DmBtn" onClick={DmRequestHandler}>
            DM
          </Button>
        </Dm>
      )}
    </Container>
  );
}

export default Profile;

const Container = styled.div`
  background-color: var(--color-light-white);
  margin: auto;
  padding: 3%;
  width: 95%;
  height: 250px;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  align-content: space-between;
`;

const TopBox = styled.div`
  display: flex;
  gap: 0.6rem;
  margin-bottom: 0.8rem;
`;

const Img = styled.img`
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
  background-color: var(--color-orange);
`;

const Dm = styled.div`
  display: flex;
  width: 100%;
`;

const NicknameBox = styled.div`
  width: 14rem;
  height: 2.5rem;
  border-radius: 25px;
  border: 2px solid var(--color-white);
  margin-top: 3%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const Nickname = styled.h3`
  font-size: var(--font-medium);
`;

const Grade = styled.p`
  margin: auto 1%;
  font-size: var(--font-small);
`;

const FollowBox = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const Follow = styled.div`
  margin-top: 6.6%;
  text-align: center;
  display: flex;
  flex-direction: column;
`;

const Num = styled.p`
  font-size: var(--font-medium);
  font-weight: var(--weight-bold);
`;

const BottomBox = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const Grades = styled.div`
  height: 1.5rem;
  padding: 0px 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-white);
  font-size: var(--font-small);
  font-weight: var(--weight-semi-bold);
  border-radius: 15px;
`;
