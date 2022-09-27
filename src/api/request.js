import axios from "axios";

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
    // withCredentials: true,
  },
});

instance.interceptors.request.use(
  function (config) {
    const accessToken = getCookie("accessToken");
    const refreshToken = getCookie("refreshToken");

    if (accessToken && refreshToken) {
      config.headers.common["Authorization"] = `${accessToken}`;
      config.headers.common["Refresh-Token"] = `${refreshToken}`;
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
    console.log("interceptor >", response);
    return response;
  },
  function (error) {
    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 오류가 있는 작업 수행
    console.log("interceptor >", error);
    return Promise.reject(error);
  }
);

imgInstance.interceptors.request.use(
  function (config) {
    const accessToken = getCookie("accessToken");
    const refreshToken = getCookie("refreshToken");
    if (accessToken && refreshToken) {
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
  return instance.post(`/api/member/signup`, sendData);
};

export const likeRecipe = async (postId) => {
  return await instance.post(`/api/auth/post/${postId}`);
};

export const getLikeRecipeList = async () => {
  return await instance.get(`/api/auth/mypage/likeposts`);
};
