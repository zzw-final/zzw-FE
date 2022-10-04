import axios from "axios";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
const KakaoRedirect = () => {
  let code = new URL(window.location.href).searchParams.get("code");
  const navigate = useNavigate();
  const [cookies, setCookies, removeCookies] = useCookies([]);

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(
        process.env.REACT_APP_API + `/api/member/login/kakao?code=${code}`
      );

      if (result.data.success && result.data.error === null) {
        const newUser = result.data.data.isFirst;
        const EMAIL = result.data.data.email;
        const OAUTH = result.data.data.oauth;
        setCookies("loginEmail", EMAIL);
        setCookies("loginOauth", OAUTH);

        if (newUser) {
          const EMAIL = result.data.data.email;
          const OAUTH = result.data.data.oauth;
          setCookies("loginEmail", EMAIL);
          setCookies("loginOauth", OAUTH);
          navigate("/join");
        } else {
          onLogin(result);
          navigate("/", { replace: true });
        }
      }
    }
    const onLogin = (result) => {
      const ACCESS_TOKEN = `Bearer ${result.headers["authorization"]}`;
      const REFRESH_TOKEN = result.headers["refresh-token"];
      const OAUTH_TOKEN = result.data.data.oauthToken;
      const EMAIL = result.data.data.email;
      const NICKNAME = result.data.data.nickname;
      const PROFILE = result.data.data.profile;
      const USERID = result.data.data.userId;
      const GRADE = result.data.data.grade;
      setCookies("accessToken", ACCESS_TOKEN);
      setCookies("refreshToken", REFRESH_TOKEN);
      setCookies("oauthToken", OAUTH_TOKEN);
      setCookies("loginEmail", EMAIL);
      setCookies("loginNickname", NICKNAME);
      setCookies("loginProfile", PROFILE);
      setCookies("loginUserId", USERID);
      setCookies("loginGrade", GRADE);
    };
    if (cookies.loginEmail === undefined) {
      fetchData();
    } else {
      removeCookies("loginEmail");
      navigate("/", { replace: true });
    }
  }, [code, navigate]);
};
export default KakaoRedirect;
