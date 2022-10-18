import { instance, imgInstance } from "./request";

//write

export const fetchpostWrite = async (data) => {
  return await instance.post(`/api/auth/post`, data);
};

//img
export const fetchImg = async (formdata) => {
  return await imgInstance.post("/api/post/image", formdata, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

//detail
export const fetchDetail = async (id) => {
  return await instance.get(`/api/post/${id}`);
};

export const fetchDelete = async (id) => {
  return await instance.delete(`/api/auth/post/${id}`);
};

export const fetchEdit = async (sendData) => {
  return await instance.put(`/api/auth/post/${sendData.id}`, sendData.data);
};

//comment
export const commentFetch = async (id) => {
  return await instance.get(`/api/post/${id}/comment`);
};

export const commentPost = async (postInfo) => {
  const comment = { comment: postInfo.comment };
  return await instance.post(
    `/api/auth/post/${postInfo.postId}/comment`,
    comment
  );
};

export const commentDelete = async (commentId) => {
  return await instance.delete(`/api/auth/post/comment/${commentId}`);
};

export const commentUpdate = async (updatedInfo) => {
  const comment = {
    comment: updatedInfo.comment,
  };
  return await instance.put(
    `/api/auth/post/comment/${updatedInfo.commentId}`,
    comment
  );
};

//좋아요
export const likePost = async (postId) => {
  return await instance.post(`/api/auth/post/${postId}`);
};

//팔로우
export const fetchFollowDe = async (postId) => {
  return await instance.post(`/api/post/${postId}/follow`);
};
