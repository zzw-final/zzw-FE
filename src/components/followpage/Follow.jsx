import React from "react";
import styled from "styled-components";
import Button from "../UI/Button";

function Follow({ follow }) {
  const { profile, nickname, grade } = follow;

  return (
    <Container>
      <LeftBox>
        <Char src={profile}></Char>
        <div>
          <Nickname>{nickname}</Nickname>
          <Grade>{grade}</Grade>
        </div>
      </LeftBox>
      <RightBox>
        <div>
          <Button name="FollowBtn">팔로잉</Button>
        </div>
      </RightBox>
    </Container>
  );
}

export default Follow;

const Container = styled.div`
  display: flex;
  padding: 1rem;
  align-items: center;
  justify-content: space-between;
`;

const LeftBox = styled.div`
  display: flex;
  align-items: center;
`;

const Char = styled.img`
  width: 4rem;
  height: 4rem;
  background-color: orange;
  border-radius: 50%;
  margin-right: 1rem;
`;

const RightBox = styled.div`
  display: flex;
`;

const Nickname = styled.div`
  font-size: var(--font-medium);
  font-weight: var(--weight-bold);
`;

const Grade = styled.div`
  margin-top: 0.3rem;
  font-size: var(--font-small);
`;
