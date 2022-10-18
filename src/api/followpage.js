import { instance } from "./request";

export const fetchMyFollow = async () => {
  return await instance.get(`/api/auth/mypage/follow`);
};

export const fetchFollow = async (id) => {
  return await instance.get(`/api/mypage/${id}/follow`);
};

export const fetchMyFollower = async () => {
  return await instance.get(`/api/auth/mypage/follower`);
};

export const fetchFollower = async (id) => {
  return await instance.get(`/api/mypage/${id}/follower`);
};

export const followHandler = async (userId) => {
  return await instance.post(`/api/auth/mypage/follow/${userId}`);
};
