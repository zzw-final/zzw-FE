import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../UI/Button";
import { instance } from "../../api/request";
import { useMutation, useQueryClient } from "react-query";
import { getCookie, removeCookie } from "../../util/cookie";
import LogoutIcon from "@mui/icons-material/Logout";

function Profile({ userData, DmRequest, profileRef }) {
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
              {gradeList.length === 0 && (
                <EmptyGrade>
                  아직 칭호가 없어요! <br></br> 열심히 활동해서 칭호를 획득해 보세요.
                </EmptyGrade>
              )}
              {gradeList?.map((grade, i) => (
                <Grades key={i}>{grade.gradeName}</Grades>
              ))}
            </BottomBox>
            {!getCookie("loginUserId") ? null : !id ? (
              <Dm>
                <Button name="DmBtn" width="60%" background="var(--color-dark-orange)">
                  <span style={{ fontSize: "13px" }}>✍️</span> 프로필 편집
                </Button>
                <Button
                  onClick={logout}
                  name="DmBtn"
                  width="40%"
                  size="var(--font-small)"
                >
                  <div style={{ display: "inline-flex" }}>
                    <LogoutIcon fontSize="small" />
                    <span style={{ fontSize: "16px", margin: "2.5px 0 0 7px" }}>
                      Logout
                    </span>
                  </div>
                </Button>
              </Dm>
            ) : (
              <Dm>
                <Button onClick={mutate} name="DmBtn" width="70%" isFollow={greyButton}>
                  {greyButton ? "팔로잉" : "팔로우"}
                </Button>
                <Button
                  name="DmBtn"
                  width="30%"
                  background="var(--color-dark-orange)"
                  onClick={DmRequest}
                >
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

export default Profile;

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
  width: 14.5rem;
  justify-content: space-evenly;
`;

const Follow = styled.div`
  margin-top: 6.6%;
  text-align: center;
  display: flex;
  flex-direction: column;
`;

const Num = styled.p`
  margin-top: 2px;
  font-size: var(--font-medium);
  font-weight: var(--weight-bold);
`;

const BottomBox = styled.div`
  height: 5rem;
  display: flex;
  gap: 3px;
  overflow-y: scroll;
  flex-wrap: wrap;
  margin: 20px 0 20px 0;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const EmptyGrade = styled.div`
  text-align: center;
  padding: 1rem 0;
`;

const Grades = styled.div`
  height: 1.5rem;
  padding: 0px 0.5rem;
  display: flex;
  align-items: center;
  background-color: var(--color-white);
  font-size: var(--font-small);
  border-radius: 10px;
`;
