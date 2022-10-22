import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/request";
import {
  getCookie,
  forLoginSetCookies,
  removeAllCookies,
  forJoinSetCookies,
} from "../../util/cookie";

const LoginRedirect = () => {
  let code = new URL(window.location.href).searchParams.get("code");
  const navigate = useNavigate();

  const pathName = new URL(window.location.href).pathname;

  useEffect(() => {
    async function fetchData() {
      const result = await login({ code, pathName });
      const status = result.data.success && result.data.error === null;
      const newUser = result.data.data.isFirst;

      if (status && newUser) {
        forJoinSetCookies(result);
        navigate("/join");
        return;
      } else if (status) {
        forLoginSetCookies(result).then(navigate("/"));
      }
    }

    if (!getCookie("loginEmail")) fetchData();
    else removeAllCookies();
  }, [code, pathName, navigate]);
};

export default LoginRedirect;
