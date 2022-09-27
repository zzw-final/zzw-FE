import React from "react";
import Follow from "./Follow";

function FollowList({ followList }) {
  return (
    <>
      {followList?.map((follow) => (
        <Follow key={follow.userId} follow={follow} />
      ))}
    </>
  );
}

export default FollowList;
