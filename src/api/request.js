import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    "Content-Type": "application/json",
    withCredentials: true,
  },
});

instance.interceptors.request.use(
  function (config) {
    const accessToken = getCookie("accessToken");
    const refreshToken = getCookie("refreshToken");

    if (accessToken !== undefined && refreshToken !== undefined) {
      config.headers.common["Authorization"] = `${accessToken}`;
      config.headers.common["Refresh-Token"] = `${refreshToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

function getCookie(key) {
  key = new RegExp(key + "=([^;]*)");
  return key.test(document.cookie) ? unescape(RegExp.$1) : "";
}

export const kakaoLoginInstance = async (code) => {
  return await axios.get(
    `${process.env.REACT_APP_API}/api/member/login/kakao?code=${code}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const join = async (sendData) => {
  sendData = { data: "", file: "" };
  return instance.post(`/api/member/signup`, sendData);
};

export const getMainData = async () => {
  return instance.get(`/api/post`);
};

export const likeRecipe = async (postId) => {
  return await instance.post(`/api/auth/post/${postId}`);
};

export const getLikeRecipe = async () => {
  return await instance.get(`/api/auth/mypage/likeposts`);
};

export const getComments = async (postId) => {
  const res = await instance.get(`/api/post/${postId}`);
  return res.data.success ? res.data.data.commentList : res.data.error;
};

export const postComment = async (postInfo) => {
  const comment = {
    comment: postInfo.comment,
  };
  const res = await instance.post(
    `/api/auth/post/${postInfo.postId}/comment`,
    comment
  );
  const storeData = {
    ...res.data.data,
    postId: postInfo.postId,
    profile: postInfo.profile,
  };
  return res.data.success ? storeData : res.data.error;
};

export const deleteComment = async (commentId) => {
  const res = await instance.delete(`/api/auth/post/comment/${commentId}`);
  return res.data.success ? commentId : res.data.error;
};

export const updateComment = async (updateInfo) => {
  const comment = {
    comment: updateInfo.comment,
  };
  const res = await instance.put(
    `/api/auth/post/comment/${updateInfo.commentId}`,
    comment
  );
  return res.data.success ? updateInfo : res.data.error;
};
