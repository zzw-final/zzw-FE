import axios from "axios";
import { getCookie } from "../util/cookie";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    "Content-Type": "application/json",
    withCredentials: true,
  },
});

export const imgInstance = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

instance.interceptors.request.use(
  function (config) {
    const accessToken = getCookie("accessToken");
    const refreshToken = getCookie("refreshToken");
    const oauth = getCookie("loginOauth");

    if (accessToken && refreshToken) {
      config.headers.common["Authorization"] = `${accessToken}`;
      config.headers.common["Refresh-Token"] = `${refreshToken}`;
      config.headers.common["oauth"] = `${oauth}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 데이터가 있는 작업 수행
    return response;
  },
  function (error) {
    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 오류가 있는 작업 수행
    return Promise.reject(error);
  }
);

imgInstance.interceptors.request.use(
  function (config) {
    const accessToken = getCookie("accessToken");
    const refreshToken = getCookie("refreshToken");
    const oauth = getCookie("loginOauth");
    if (accessToken && refreshToken) {
      config.headers.common["Authorization"] = `${accessToken}`;
      config.headers.common["Refresh-Token"] = `${refreshToken}`;
      config.headers.common["oauth"] = `${oauth}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const login = async ({ code, pathName }) => {
  const baseURL = process.env.REACT_APP_API;
  switch (pathName) {
    case "/authkakao":
      return await axios.get(`${baseURL}/api/member/login/kakao?code=${code}`);
    case "/authnaver":
      return await axios.get(
        `${baseURL}/api/member/login/naver?code=${code}&state=${process.env.NAVER_STATE}`
      );
    case "/authgoogle":
      return await axios.get(`${baseURL}/api/member/login/google?code=${code}`);
    default:
      throw new Error(`${pathName} 는 올바른 경로가 아닙니다.`);
  }
};

export const kakaoLogoutInstance = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/api/member/kakao/logout`, {
    headers: {
      kakaoToken: getCookie("oauthToken"),
      withCredentials: true,
    },
  });
};

export const join = async (sendData) => {
  return instance.post(`/api/member/signup`, sendData);
};

export const likes = async (postId) => {
  return await instance.post(`/api/auth/post/${postId}`);
};

export const fetchSearchRecipe = async (filterInfo, lastPostId) => {
  const sendLastPostId = lastPostId ? `&lastPostId=${lastPostId}` : ``;
  return await instance.get(`/api/post/filter/${filterInfo}${sendLastPostId}`);
};

export const fetchAlarm = async () => {
  return await instance.get(`/api/chat/alarm`);
};
