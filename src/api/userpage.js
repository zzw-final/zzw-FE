import { instance } from "./request";

export const fetchUserProfile = async (id) => {
  return await instance.get(`/api/mypage/${id}`);
};

export const fetchUserRecipes = async (id) => {
  return await instance.get(`/api/mypage/${id}/myposts`);
};

export const directMessage = async (id) => {
  const response = await instance.get(`/api/mypage/${id}/chat`);
  return response;
};
