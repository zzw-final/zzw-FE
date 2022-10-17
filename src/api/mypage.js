import { instance } from "./request";

export const fetchProfile = async () => {
  return await instance.get(`/api/auth/mypage`);
};

export const fetchMyRecipes = async () => {
  return await instance.get(`/api/auth/mypage/myposts`);
};

export const fetchLikeRecipes = async (lastPostId) => {
  const params = lastPostId ? `?lastPostId=${lastPostId}` : ``;
  return await instance.get(`/api/auth/mypage/likeposts${params}`);
};

export const withdrawal = async (loginUserId) => {
  return await instance.delete(`/api/member/resign/${loginUserId}`);
};

export const editImgList = async () => {
  return await instance.get(`/api/member/profile`);
};

export const editProfileImg = async (profileId) => {
  return await instance.put(`/api/member/profile/${profileId}`);
};
