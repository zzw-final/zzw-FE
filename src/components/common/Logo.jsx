import { React } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { instance } from "../../api/request";
import { getCookie, removeAllCookies, removeCookie } from "../../util/cookie";
import Button from "../UI/Button";

const Logo = () => {
  const navigate = useNavigate();
  const loginUserId = getCookie("loginUserId");

  const logIn = () => {
    navigate("/login");
  };

  const logOut = () => {
    const alert = window.confirm("로그아웃 하시겠습니까?");
    if (alert) {
      if (getCookie("loginOauth") === "kakao") {
        instance.kakaoLogoutInstance();
      }
      removeAllCookies();
      navigate("/");
      window.location.reload();
    }
  };

  return (
    <LogoContainer>
      <LogoImg src="/logo.png" alt="logo" />
      {!loginUserId ? (
        <Button
          name="commonBtn"
          position="absolute"
          backgroundColor="var(--color-orange)"
          right="0"
          margin="0.5rem"
          width="3rem"
          fontSize="var(--font-small)"
          onClick={logIn}
        >
          LogIn
        </Button>
      ) : (
        <Button
          name="commonBtn"
          position="absolute"
          backgroundColor="var(--color-orange)"
          right="0"
          margin="0.5rem"
          width="3.5rem"
          fontSize="var(--font-small)"
          onClick={logOut}
        >
          LogOut
        </Button>
      )}
    </LogoContainer>
  );
};

const LogoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-size: 32px;
  font-weight: bold;
  color: var(--color-real-light-orange);
  text-shadow: 1px 1px 2px var(--color-orange);
  margin-bottom: 0.3rem;
`;

const LogoImg = styled.img`
  width: 6rem;
  padding-top: 1rem;
`;

export default Logo;
