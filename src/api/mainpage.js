import { instance } from "./request.js";

export const fetchBestTagTopFive = async () => {
  return await instance.get(`/api/post/tag`);
};

export const fetchBestList = async () => {
  console.log("best가져오는중....");
  return await instance.get(`/api/post/best`);
};

export const fetchRecentList = async () => {
  return await instance.get(`/api/auth/post/recent`);
};

export const fetchRecentListInfinite = async (lastPostId) => {
  const sendUrl = lastPostId ? `?lastPostId=${lastPostId}` : ``;
  return await instance.get(`/api/post/recent${sendUrl}`);
};

export const fetchFollowListInfinite = async (lastPostId) => {
  const sendUrl = lastPostId ? `?lastPostId=${lastPostId}` : ``;
  return await instance.get(`/api/auth/post/follow${sendUrl}`);
};
