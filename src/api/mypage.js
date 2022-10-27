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

export const editApi = {
  editImgList: async () => {
    return await instance.get(`/api/member/profile`);
  },
  editGradeList: async () => {
    return await instance.get(`/api/member/grade`);
  },
  editNickname: async (nickname) => {
    return await instance.put(`/api/auth/mypage/nickname`, { nickname });
  },
  editProfile: async (profileId, gradeId) => {
    return await instance.put(`api/member/update`, { profileId, gradeId });
  },
};
