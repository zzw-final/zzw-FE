import axios from "axios";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";

function GoogleRedirect() {
  const code = new URL(window.location.href).searchParams.get("code");
  const [cookies, setCookie, removeCookies] = useCookies();
  const navigate = useNavigate();
  const setNickname = cookies.setNickname;

  useEffect(() => {
    async function googleLogin() {
      const res = await axios.get(
        process.env.REACT_APP_API + `/api/member/login/google?code=${code}`
      );

      if (res.data.success && res.data.error === null) {
        const newUser = res.data.data.isFirst;
        const isDuplicate = res.data.data.isDuplicate;
        const EMAIL = res.data.data.email;
        const OAUTH = res.data.data.oauth;
        setCookie("loginEmail", EMAIL);
        setCookie("loginOauth", OAUTH);

        if (isDuplicate) {
          if (
            window.confirm(
              "기존에 동일한 이메일로 가입했습니다. 통합하시겠습니까?"
            )
          ) {
            const res = await axios.put(
              process.env.REACT_APP_API + `/api/member/integration`,
              { email: EMAIL, oauth: OAUTH }
            );
            if (res.data.success && res.data.error === null) {
              console.log("res 통합 :>> ", res);
              onLogin(res);
            }
          } else {
            navigate("/join");
          }
          return;
        }

        if (newUser && !isDuplicate && setNickname === undefined) {
          navigate("/join");
        } else {
          onLogin(res);
          navigate("/", { replace: true });
        }
      }
    }

    const onLogin = (res) => {
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
    };

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
