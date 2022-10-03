import axios from "axios";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";

function GoogleRedirect() {
  const [cookies, setCookie, removeCookies] = useCookies();
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");

  const location = useLocation();

  console.log("location.state.notFirst :>> ", location);

  useEffect(() => {
    async function googleLogin() {
      const res = await axios.get(
        process.env.REACT_APP_API + `/api/member/login/google?code=${code}`
      );

      if (res.data.success && res.data.error === null) {
        const newUser = res.data.data.isFirst;
        console.log("result.data.data.isFirst", res.data.data.isFirst);
        if (newUser === true) {
          const EMAIL = res.data.data.email;
          const OAUTH = res.data.data.oauth;
          setCookie("loginEmail", EMAIL);
          setCookie("loginOauth", OAUTH);
          navigate("/join");
        } else {
          const ACCESS_TOKEN = res.headers["authorization"];
          const REFRESH_TOKEN = res.headers["refresh-token"];
          const EMAIL = res.data.data.email;
          const NICKNAME = res.data.data.nickname;
          const PROFILE = res.data.data.profile;
          const USERID = res.data.data.userId;
          const GRADE = res.data.data.grade;
          setCookie("accessToken", ACCESS_TOKEN);
          setCookie("refreshToken", REFRESH_TOKEN);
          setCookie("loginEmail", EMAIL);
          setCookie("loginNickname", NICKNAME);
          setCookie("loginProfile", PROFILE);
          setCookie("loginUserId", USERID);
          setCookie("loginGrade", GRADE);
          navigate("/", { replace: true });
        }
      }
    }
    if (cookies.loginEmail === undefined) {
      googleLogin();
    } else {
      removeCookies("loginEmail");
      navigate("/", { replace: true });
    }
  }, [code, navigate, cookies, setCookie, removeCookies]);

  return;
}

export default GoogleRedirect;
