import React from "react";
import styled from "styled-components";

function GoogleLogin() {
  const GOOGLE_URI = `https://accounts.google.com/o/oauth2/v2/auth?scope=email%20openid&response_type=code&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}&client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}`;

  return (
    <a href={GOOGLE_URI}>
      <GoogleLoginBtn src={"/googlelogin.png"} alt="googlelogin"></GoogleLoginBtn>
    </a>
  );
}

const GoogleLoginBtn = styled.img`
  width: 50px;
  height: 50px;
`;

export default GoogleLogin;
