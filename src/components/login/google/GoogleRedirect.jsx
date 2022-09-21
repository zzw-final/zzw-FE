import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function GoogleRedirect() {
  const [, setCookie] = useCookies();
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");

  console.log("구글코드", code);

  useEffect(() => {
    async function googleLogin() {
      const res = await axios.get(
        process.env.REACT_APP_API + `/api/member/login/google?code=${code}`
      );
      console.log(res);

      if (res.data.success && res.data.error === null) {
        const ACCESS_TOKEN = res.headers["authorization"];
        const REFRESH_TOKEN = res.headers["refresh-token"];
        const EMAIL = res.data.data.email;
        const NICKNAME = res.data.data.nickname;
        const PROFILE = res.data.data.profile;
        const USERID = res.data.data.userId;
        setCookie("accessToken", ACCESS_TOKEN);
        setCookie("refreshToken", REFRESH_TOKEN);
        setCookie("loginEmail", EMAIL);
        setCookie("loginNickname", NICKNAME);
        setCookie("loginNickname", "google");
        setCookie("loginProfile", PROFILE);
        setCookie("loginUserId", USERID);
        if (NICKNAME === "google") {
          navigate("/join");
        } else {
          navigate("/");
        }
      }
    }
    googleLogin();
  }, [code, navigate, setCookie]);

  return <div>구글로그인</div>;
}

export default GoogleRedirect;
