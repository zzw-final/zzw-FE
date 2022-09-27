import React, { useEffect } from "react";
import { instance } from "../api/request";
import FollowLayout from "../components/followpage/FollowLayout";
import FollowList from "../components/followpage/FollowList";

const FollowPage = () => {
  return (
    <>
      <FollowLayout />
      <FollowList />
    </>
  );
};

export default FollowPage;
