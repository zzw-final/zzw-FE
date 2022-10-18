import { instance } from "./request.js";

export const fetchBestTagTopFive = async () => {
  return await instance.get(`/api/post/tag`);
};

export const fetchBestList = async () => {
  console.log("fetchBestList....");
  return await instance.get(`/api/post/best`);
};

export const fetchRecentList = async () => {
  console.log("fetchRecentList....");
  return await instance.get(`/api/auth/post/recent`);
};

export const fetchRecentListInfinite = async (lastPostId) => {
  console.log("fetchRecentListInfinite....");
  const sendUrl = lastPostId ? `?lastPostId=${lastPostId}` : ``;
  return await instance.get(`/api/post/recent${sendUrl}`);
};

export const fetchFollowListInfinite = async (lastPostId) => {
  console.log("fetchFollowListInfinite....");
  const sendUrl = lastPostId ? `?lastPostId=${lastPostId}` : ``;
  return await instance.get(`/api/auth/post/follow${sendUrl}`);
};
