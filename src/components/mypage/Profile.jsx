import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../Button";

function Profile({ userData }) {
  const navigate = useNavigate();
  // console.log(userData);
  return (
    <Container>
      <div>
        <TopBox>
          <Img src={userData?.profile}></Img>
          <div>
            <NicknameBox>
              <Nickname>{userData?.nickname}</Nickname>
              <Grade>{userData?.grade}</Grade>
            </NicknameBox>
            <FollowBox>
              <Follow
                onClick={() => {
                  navigate("/follow");
                }}
              >
                <p>팔로우</p>
                <Num>{userData?.follow}</Num>
              </Follow>
              <Follow
                onClick={() => {
                  navigate("/follow");
                }}
              >
                <p>팔로워</p>
                <Num>{userData?.follower}</Num>
              </Follow>
            </FollowBox>
          </div>
        </TopBox>
        {/* TODO: 보이는거 최대 개수 정해놔야 될 듯 나중에 펼치기를 넣든지 */}
        <BottomBox>
          <Grades>태초의 존재</Grades>
          <Grades>사이트의 개발자</Grades>
          <Grades>한식 외길 인생</Grades>
          <Grades>레시피북 출간가능</Grades>
          <Grades>쩝쩝박사</Grades>
          <Grades>먹잘알</Grades>
        </BottomBox>
      </div>
      <Button name="ProfileBtn">팔로우 / 언팔로우</Button>
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
