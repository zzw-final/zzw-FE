import styled from "styled-components";
import React from "react";
import Button from "../UI/Button";
import { getCookie } from "../../util/cookie";

// TODO: 닉네임 검색 기능

function FollowLayout({ onFetchFollower, onToggleHandler, followView, followerView }) {
  const nickname = getCookie("loginNickname");

  return (
    <>
      <Container>
        <Nickname>{nickname}</Nickname>
      </Container>
      <Container>
        <Button name="followPageBtn" onClick={onToggleHandler} view={followView}>
          팔로우
        </Button>
        <Button name="followPageBtn" onClick={onFetchFollower} view={followerView}>
          팔로워
        </Button>
      </Container>
    </>
  );
}

export default FollowLayout;

const Container = styled.div`
  display: flex;
`;

const Nickname = styled.div`
  width: 100%;
  text-align: center;
  padding: 0.5rem;
  border-bottom: 2px solid var(--color-light-white);
  font-weight: var(--weight-bolder);
  margin-bottom: 10px;
`;
