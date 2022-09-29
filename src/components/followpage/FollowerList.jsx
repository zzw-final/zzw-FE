import React from "react";
import Follow from "./Follow";
import styled from "styled-components";

function FollowerList({ followerList, onFollowHandler }) {
  if (followerList?.length === 0) {
    return <Div>팔로워 목록이 여기에 표시됩니다.</Div>;
  }

  return (
    <>
      {followerList?.map((follow) => (
        <Follow key={follow.userId} follow={follow} onFollowHandler={onFollowHandler} />
      ))}
    </>
  );
}

export default FollowerList;

const Div = styled.div`
  color: var(--color-grey);
  margin-top: 5rem;
  text-align: center;
`;
