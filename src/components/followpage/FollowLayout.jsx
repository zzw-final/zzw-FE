import styled from "styled-components";
import React from "react";
import Button from "../UI/Button";

function FollowLayout({ onClickFollower, onClickfollow, followView, followerView }) {
  return (
    <>
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
