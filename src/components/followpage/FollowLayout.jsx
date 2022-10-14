import styled from "styled-components";
import React from "react";
import Button from "../UI/Button";
import { getCookie } from "../../util/cookie";
import { useParams } from "react-router-dom";

function FollowLayout({
  onClickFollower,
  onClickfollow,
  followView,
  followerView,
  nickname,
}) {
  const myName = getCookie("loginNickname");
  const { id } = useParams();

  return (
    <>
      <Container>
        <Nickname>{id ? nickname : myName}</Nickname>
      </Container>
      <Container>
        <Button name="followPageBtn" onClick={onClickfollow} view={followView}>
          팔로우
        </Button>
        <Button name="followPageBtn" onClick={onClickFollower} view={followerView}>
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
  background-color: var(--color-light-orange);
  text-align: center;
  padding: 1rem;
  font-size: var(--font-regular);
  font-weight: var(--weight-bolder);
`;
