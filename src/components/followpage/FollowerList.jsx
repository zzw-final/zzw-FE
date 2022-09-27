import React from "react";
import Follow from "./Follow";

function FollowerList({ followerList }) {
  return (
    <>
      {followerList?.map((follow) => (
        <Follow key={follow.userId} follow={follow} />
      ))}
    </>
  );
}

export default FollowerList;
