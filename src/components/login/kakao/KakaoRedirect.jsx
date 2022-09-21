import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { kakaoLoginInstance } from "../../../api/request";

const KakaoRedirect = () => {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies([]);

  // 인가코드
  let code = new URL(window.location.href).searchParams.get("code");

  console.log("code :>> ", code);
  // TODO: SetCookie 함수로 쿠키 셋업 하고 싶은데, hook은 함수형 컴포넌트 바로 아래에서만 사용가능 하다고 암됨.
  // 방법 찾아봐야 함. 휵의 규칙이 틀렸다는 에러 뜸.
  useEffect(() => {
    async function fetchData() {
      const result = await kakaoLoginInstance(code);

      if (result.data.success && result.data.error === null) {
        const newUser = result.data.data.isFirst;
        if (newUser === true) {
          const EMAIL = result.data.data.email;
          setCookies("loginEmail", EMAIL);
          navigate("/join");
        } else {
          const ACCESS_TOKEN = `Bearer ${result.headers["authorization"]}`;
          const REFRESH_TOKEN = result.headers["refresh-token"];
          const KAKAO_TOKEN = result.data.data.kakaoToken;
          const EMAIL = result.data.data.email;
          const NICKNAME = result.data.data.nickname;
          const PROFILE = result.data.data.profile;
          const USERID = result.data.data.userId;
          const GRADE = result.data.data.grade;
          setCookies("accessToken", ACCESS_TOKEN);
          setCookies("refreshToken", REFRESH_TOKEN);
          setCookies("kakaoToken", KAKAO_TOKEN);
          setCookies("loginEmail", EMAIL);
          setCookies("loginNickname", NICKNAME);
          setCookies("loginProfile", PROFILE);
          setCookies("loginUserId", USERID);
          setCookies("loginGrade", GRADE);
          navigate("/");
        }
      }
    }
    fetchData();
  }, [code, navigate]);
};

export default KakaoRedirect;
