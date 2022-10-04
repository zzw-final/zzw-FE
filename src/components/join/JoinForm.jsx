import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useLocation, useNavigate } from "react-router-dom";
import { join } from "../../api/request";
import { useCookies } from "react-cookie";

const JoinForm = (props) => {
  const REGEX_NICKNAME = /[ㄱ-ㅎ|가-힣]+$/;

  const [nickname, setNickname] = useState("");
  const [isNickname, setIsNickname] = useState(false);
  const [signup, setSignup] = useState(false);
  const [cookies, setCookies] = useCookies(["loginEmail", "loginOauth"]);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (signup === false) {
      return;
    }

    const loginEmail = cookies.loginEmail;
    const loginOauth = cookies.loginOauth;
    const result = await join({
      email: loginEmail,
      oauth: loginOauth,
      nickname,
    });

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

    if (result.data.success && result.data.error === null) {
      onLogin(result);
      navigate("/");
    }
  };

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    switch (name) {
      case "nickname":
        return setNickname(value);
      default:
    }
  };

  const validation = (text, regex) => {
    const helperText = regex.test(text) ? false : true;
    return text ? helperText : false;
  };

  const validation_nickname = useCallback(() => {
    return validation(nickname, REGEX_NICKNAME);
  }, [nickname, REGEX_NICKNAME]);

  useEffect(() => {
    nickname && validation_nickname() === false
      ? setIsNickname(true)
      : setIsNickname(false);
  }, [nickname, validation_nickname]);

  useEffect(() => {
    if (isNickname) {
      setSignup(true);
    } else {
      setSignup(false);
    }
  }, [isNickname]);

  return (
    <BoxContainer>
      <Boxs>
        <Box component="form" onSubmit={handleSubmit} sx={{ ml: 2 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            value={nickname}
            label="닉네임을 입력하세요."
            name="nickname"
            onChange={onChange}
            error={validation_nickname()}
            helperText={
              validation_nickname() ? "한글만 입력할 수 있습니다." : ""
            }
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="success"
            endIcon={<ArrowForwardIcon />}
          >
            Sign Up
          </Button>
        </Box>
      </Boxs>
    </BoxContainer>
  );
};

const BoxContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const Boxs = styled.div`
  max-width: 600px;
  display: flex;
  align-items: center;
  margin: auto;
  padding: 2em;
  border-radius: 1em;
`;

export default JoinForm;
