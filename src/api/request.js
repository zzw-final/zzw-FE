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
    const [cookies] = useCookies();
    const accessToken = cookies.accessToken;
    const refreshToken = cookies.refreshToken;
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

// export const kakaoLogout = async (code) => {
//   return await axios.get(
//     `${process.env.REACT_APP_API}/api/member/kakao/logout`,
//     {
//       headers: {
//         "Content-Type": "application/json",
//         kakaoToken: cookies.kakaoToken,
//       },
//     }
//   );
// };

export const join = async (nickname) => {
  return instance.put("/api/auth/member/signup", nickname);
};
