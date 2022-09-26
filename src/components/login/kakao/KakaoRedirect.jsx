import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { kakaoLoginInstance } from "../../../api/request";

const KakaoRedirect = () => {
  const navigate = useNavigate();
  const [cookies, setCookies, removeCookies] = useCookies([]);

  // 인가코드
  let code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    async function fetchData() {
      const result = await kakaoLoginInstance(code);
      console.log("result.data.data.isFirst", result.data.data.isFirst);
      if (result.data.success && result.data.error === null) {
        const newUser = result.data.data.isFirst;
        if (newUser === true) {
          const EMAIL = result.data.data.email;
          setCookies("loginEmail", EMAIL);
          navigate("/join");
        } else {
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
          navigate("/", { replace: true });
        }
      }
    }
    if (cookies.loginEmail === undefined) {
      fetchData();
    } else {
      removeCookies("loginEmail");
      navigate("/", { replace: true });
    }
  }, [code, navigate]);
};

export default KakaoRedirect;
