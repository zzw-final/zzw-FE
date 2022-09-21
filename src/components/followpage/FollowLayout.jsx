import styled from "styled-components";
import React from "react";

function FollowLayout() {
  return (
    <>
      <Container>
        {/* 여기 닉네임 검색 기능이 있어도 좋을 듯 */}
        <Nickname>다함께차차차</Nickname>
      </Container>
      <Container>
        <Follower autoFocus="autoFocus">팔로우</Follower>
        <Follower>팔로잉</Follower>
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

const Follower = styled.button`
  margin: 1rem auto;
  background-color: transparent;
  border: 3px solid transparent;
  font-size: var(--font-regular);
  font-weight: var(--weight-semi-bold);
  color: var(--color-grey);
  padding: 0rem 1rem;

  &:focus {
    color: var(--color-black);
    outline: none;
    background-color: var(--color-light-white);
  }
`;
