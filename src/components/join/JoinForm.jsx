import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { join } from "../../api/request";
import axios from "axios";
import { useCookies } from "react-cookie";

const JoinForm = (props) => {
  const REGEX_NICKNAME = /[ㄱ-ㅎ|가-힣]+$/;

  const [nickname, setNickname] = useState("");
  const [isNickname, setIsNickname] = useState(false);
  const [signup, setSignup] = useState(false);

  const [cookies, setCookies] = useCookies([
    "accessToken",
    "refreshToken",
    "loginNickname",
  ]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (signup === false) {
      return;
    }

    const result = await axios.put(
      `${process.env.REACT_APP_API}/api/auth/member/signup`,
      { nickname },
      {
        headers: {
          Authorization: cookies.accessToken,
          "Refresh-Token": cookies.refreshToken,
          "Content-Type": "application/json",
          withCredentials: true,
        },
      }
    );
    if (result.data.success && result.data.error === null) {
      setCookies("loginNickname", nickname);
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

const LoginImg = styled.img`
  max-width: 300px;
`;

export default JoinForm;
