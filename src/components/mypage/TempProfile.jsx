import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../UI/Button";
import { instance } from "../../api/request";
import { useMutation, useQueryClient } from "react-query";
import { getCookie, removeCookie } from "../../util/cookie";

function TempProfile({ userData, DmRequest, profileRef }) {
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
      queryClient.invalidateQueries(["userpage", "profile"]);
      queryClient.invalidateQueries(["mypage", "profile"]);
      queryClient.invalidateQueries(["follow"]);
      queryClient.invalidateQueries(["follower"]);
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
    <Container ref={profileRef}>
      <div>
        <TopBox>
          <div>
            <Img src={profile}></Img>
            <NicknameBox>
              <Nickname>{nickname}</Nickname>
              <div>{grade}</div>
            </NicknameBox>
          </div>
          <div>
            <FollowBox>
              <Follow>
                <p>레시피</p>
                <Num>3</Num>
              </Follow>
              <Follow onClick={followClick}>
                <p>팔로우</p>
                <Num>{follow}</Num>
              </Follow>
              <Follow onClick={followerClick}>
                <p>팔로워</p>
                <Num>{followerNum}</Num>
              </Follow>
            </FollowBox>
            <BottomBox>
              {gradeList?.map((grade, i) => (
                <Grades key={i}>{grade.gradeName}</Grades>
              ))}
            </BottomBox>
            {!getCookie("loginUserId") ? null : !id ? (
              <Dm>
                <Button name="ProfileBtn">프로필 편집</Button>
                <Button
                  onClick={logout}
                  name="DmBtn"
                  width="20%"
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
                <Button name="DmBtn" onClick={DmRequest}>
                  DM
                </Button>
              </Dm>
            )}
          </div>
        </TopBox>
      </div>
    </Container>
  );
}

export default TempProfile;

const Container = styled.div`
  background-color: var(--color-light-orange);
  margin: auto;
  padding: 3% 2% 0 1.5%;
  width: 100%;
  height: 230px;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  align-content: space-between;
`;

const TopBox = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.8rem;
`;

const Img = styled.img`
  margin: 0.5rem 0.2rem;
  width: 8.2rem;
  height: 8.2rem;
  border-radius: 50%;
  background-color: var(--color-orange);
`;

const Dm = styled.div`
  display: flex;
  width: 100%;
`;

const NicknameBox = styled.div`
  text-align: center;
  padding: 0.4rem;
`;

const Nickname = styled.h3`
  font-size: var(--font-medium-large);
  margin-bottom: 5px;
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
  gap: 0.3rem;
  flex-wrap: wrap;
  margin: 20px 0 20px 0;
`;

const Grades = styled.div`
  height: 1.5rem;
  padding: 0px 0.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-white);
  font-size: var(--font-small);
  border-radius: 10px;
`;
