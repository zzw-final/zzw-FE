import axios from "axios";
import { useCookies } from "react-cookie";

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
    if (accessToken !== null && refreshToken !== null) {
      config.headers.common["authorization"] = `${accessToken}`;
      config.headers.common["Refresh-token"] = `${refreshToken}`;
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
  return axios.post(`${process.env.REACT_APP_API}/api/member/signup`, sendData);
};
