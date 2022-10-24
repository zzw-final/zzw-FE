import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name, value, option) => cookies.set(name, value, { ...option });
export const getCookie = (name) => cookies.get(name);
export const removeCookie = (name, option) => cookies.remove(name, { ...option });

export function removeAllCookies() {
  const cookies = document.cookie.split("; ");
  for (let i in cookies)
    document.cookie = /^[^=]+/.exec(cookies[i])[0] + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
}

export function forJoinSetCookies(result) {
  const { email, oauth, invalidTime } = result.data.data;
  setCookie("loginEmail", email);
  setCookie("loginOauth", oauth);
  setCookie("tokenInvalidtime", invalidTime);
}

export function forLoginSetCookies(result) {
  return new Promise(function (resolve, reject) {
    const { oauthToken, email, nickname, profile, userId, grade, invalidTime, oauth } =
      result.data.data;
    const ACCESS_TOKEN = `Bearer ${result.headers["authorization"]}`;
    const REFRESH_TOKEN = result.headers["refresh-token"];
    setCookie("accessToken", ACCESS_TOKEN);
    setCookie("refreshToken", REFRESH_TOKEN);
    setCookie("oauthToken", oauthToken);
    setCookie("loginEmail", email);
    setCookie("loginNickname", nickname);
    setCookie("loginProfile", profile);
    setCookie("loginUserId", userId);
    setCookie("loginGrade", grade);
    setCookie("tokenInvalidtime", invalidTime);
    setCookie("loginOauth", oauth);
    resolve("success");
  });
}
