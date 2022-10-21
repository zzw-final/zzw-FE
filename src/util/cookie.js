import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name, value, option) => cookies.set(name, value, { ...option });
export const getCookie = (name) => cookies.get(name);
export const removeCookie = (name, option) => cookies.remove(name, { ...option });

export function removeAllCookies() {
  const cookies = document.cookie.split("; ");
  for (let i in cookies) document.cookie = /^[^=]+/.exec(cookies[i])[0] + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
}
