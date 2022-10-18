import axios from "axios";
import styled from "styled-components";
import Button from "../UI/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { instance } from "../../api/request";
import { useMutation, useQueryClient } from "react-query";
import { getCookie, removeCookie } from "../../util/cookie";

function Profile({ userData, DmRequest, profileRef, editHandler }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const { follow, follower, grade, gradeList, nickname, profile, isFollow, postSize } =
    userData;
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
      removeCookie("tokenInvalidtime");
      navigate("/");
    }
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
      queryClient.invalidateQueries(["mainPage", "infinite"]);
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
                <Num>{postSize}</Num>
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
                <Button onClick={editHandler} name="DmBtn" width="60%">
                  <span style={{ fontSize: "13px" }}>✍️</span> 프로필 편집
                </Button>
                <Button
                  onClick={logout}
                  name="DmBtn"
                  width="40%"
                  size="var(--font-small)"
                  background="var(--color-dark-orange)"
                >
                  <div style={{ display: "inline-flex" }}>
                    <LogoutIcon fontSize="small" />
                    <span
                      style={{
                        fontSize: "var(--font-semi-small)",
                        margin: "1px 0 0 5px",
                      }}
                    >
                      Logout
                    </span>
                  </div>
                </Button>
              </Dm>
            ) : (
              <Dm>
                <Button
                  onClick={mutate}
                  name="DmBtn"
                  width="70%"
                  background={
                    greyButton ? "var(--color-dark-white)" : "var(--color-real-orange)"
                  }
                >
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
  font-size: var(--font-medium-large);
  font-weight: var(--weight-bolder);
`;

const BottomBox = styled.div`
  height: 5rem;
  display: flex;
  gap: 5px;
  overflow-y: scroll;
  flex-wrap: wrap;
  margin: 17px 0 20px 0;
  &::-webkit-scrollbar {
    display: none;
  }
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
