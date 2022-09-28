import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../UI/Button";
import { instance } from "../../api/request";

function Profile({ userData }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const { follow, follower, grade, gradeList, nickname, profile, isFollow } = userData;
  const [greyButton, setGreyButton] = useState(isFollow);
  console.log("팔로우", follow);
  console.log("팔로워", follower);

  const onFollowHandler = async () => {
    setGreyButton((prev) => !prev);
    return await instance.post(`/api/auth/mypage/follow/${id}`);
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
              <Follow
                onClick={() => {
                  navigate("/follow");
                }}
              >
                <p>팔로우</p>
                <Num>{follow}</Num>
              </Follow>
              <Follow
                onClick={() => {
                  navigate("/follow");
                }}
              >
                <p>팔로워</p>
                <Num>{follower}</Num>
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
      {!id ? (
        <Button name="ProfileBtn" isFollow={true}>
          프로필 편집
        </Button>
      ) : (
        <Button onClick={onFollowHandler} name="ProfileBtn" isFollow={greyButton}>
          {greyButton ? "팔로잉" : "팔로우"}
        </Button>
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
