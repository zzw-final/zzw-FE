import { instance } from "./request.js";

export const fetchBestTagTopFive = async () => {
  return await instance.get(`/api/post/tag`);
};

export const fetchBestList = async () => {
  return await instance.get(`/api/post/best`);
};

export const fetchRecentList = async () => {
  return await instance.get(`/api/auth/post/recent`);
};

export const fetchRecentListInfinite = async (lastPostId, isLastFromServer) => {
  console.log("recentList 요청 ... ");
  //   if (isLastFromServer === "true") {
  //     return await instance.get(`/api/post/recent?isLast=true`);
  //   } else if (lastPostId) {
  //     return await instance.get(`/api/post/recent?lastPostId=${lastPostId}`);
  //   } else {
  //     return await instance.get(`/api/post/recent`);
  //   }
  const sendUrl = lastPostId ? `?lastPostId=${lastPostId}` : ``;
  return await instance.get(`/api/post/recent${sendUrl}`);
};

export const fetchFollowListInfinite = async (lastPostId, isLastFromServer) => {
  console.log("followList 요청 ... ");
  const sendUrl = lastPostId ? `?lastPostId=${lastPostId}` : ``;
  return await instance.get(`/api/auth/post/follow${sendUrl}`);
  //   if (isLastFromServer === "true") {
  //     return await instance.get(`/api/auth/post/follow?isLast=true`);
  //   } else if (lastPostId) {
  //     return await instance.get(`/api/auth/post/follow?lastPostId=${lastPostId}`);
  //   } else {
  //     return await instance.get(`/api/auth/post/follow`);
  //   }
};
