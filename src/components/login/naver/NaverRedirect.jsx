import axios from "axios";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";

function NaverRedirect() {
  const code = new URL(window.location.href).searchParams.get("code");
  const [cookies, setCookie, removeCookies] = useCookies();
  const navigate = useNavigate();

  useEffect(() => {
    async function NaverLogin() {
      const res = await axios.get(
        process.env.REACT_APP_API +
          `/api/member/login/naver?code=${code}&state=${process.env.NAVER_STATE}`
      );

      if (res.data.success && res.data.error === null) {
        const newUser = res.data.data.isFirst;
        // const isDuplicate = res.data.data.isDuplicate;
        const EMAIL = res.data.data.email;
        const OAUTH = res.data.data.oauth;
        setCookie("loginEmail", EMAIL);
        setCookie("loginOauth", OAUTH);

        // if (isDuplicate) {
        //   if (
        //     window.confirm(
        //       "기존에 동일한 이메일로 가입했습니다. 통합하시겠습니까?"
        //     )
        //   ) {
        //     const res = await axios.put(
        //       process.env.REACT_APP_API + `/api/member/integration`,
        //       { email: EMAIL, oauth: OAUTH }
        //     );
        //     if (res.data.success && res.data.error === null) {
        //       console.log("res 통합 :>> ", res);
        //       onLogin(res);
        //     }
        //   } else {
        //     navigate("/join");
        //   }
        //   return;
        // }

        // if (newUser && !isDuplicate) {
        if (newUser) {
          navigate("/join", { replace: true });
        } else {
          onLogin(res);
          navigate("/", { replace: true });
        }
      }
    }
    const onLogin = (res) => {
      console.log("res onLogin :>> ", res);
      const ACCESS_TOKEN = `Bearer ${res.headers["authorization"]}`;
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
    };
    if (cookies.loginEmail === undefined) {
      NaverLogin();
    } else {
      removeCookies("loginEmail");
      navigate("/", { replace: true });
    }
  }, [code, navigate, cookies, setCookie, removeCookies]);

  return;
}

export default NaverRedirect;
