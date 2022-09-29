import React from "react";
import Follow from "./Follow";
import styled from "styled-components";

function FollowList({ followList, onFollowHandler }) {
  if (followList?.length === 0) {
    return <Div>팔로우 목록이 여기에 표시됩니다.</Div>;
  }

  return (
    <>
      {followList?.map((follow) => (
        <Follow key={follow.userId} follow={follow} onFollowHandler={onFollowHandler} />
      ))}
    </>
  );
}

export default FollowList;

const Div = styled.div`
  color: var(--color-grey);
  margin-top: 5rem;
  text-align: center;
`;
