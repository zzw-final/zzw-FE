import { instance } from "./request";

export const fetchProfile = async () => {
  return await instance.get(`/api/auth/mypage`);
};

export const fetchMyRecipes = async () => {
  return await instance.get(`/api/auth/mypage/myposts`);
};

export const fetchLikeRecipes = async () => {
  return await instance.get(`/api/auth/mypage/likeposts`);
};
