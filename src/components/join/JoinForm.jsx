import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { join } from "../../api/request";
import { forLoginSetCookies, getCookie } from "../../util/cookie";

const JoinForm = () => {
  const REGEX_NICKNAME = /^(?=.*[가-힣])[가-힣]{1,6}$/;

  const [nickname, setNickname] = useState("");
  const [isNickname, setIsNickname] = useState(false);
  const [signup, setSignup] = useState(false);
  const email = getCookie("loginEmail");
  const oauth = getCookie("loginOauth");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!signup) return;

    const result = await join({
      email,
      oauth,
      nickname,
    });

    if (result.data.error === "DUPLICATE_NICKNAME") alert("이미 등록된 닉네임입니다 🥲");

    if (result.data.success && result.data.error === null) {
      forLoginSetCookies(result).then(navigate("/"));
    }
  };

  const onChange = (event) => {
    return setNickname(event.target.value);
  };

  const validation = (text, regex) => {
    const helperText = regex.test(text) ? false : true;
    return text ? helperText : false;
  };

  const validation_nickname = useCallback(() => {
    return validation(nickname, REGEX_NICKNAME);
  }, [nickname, REGEX_NICKNAME]);

  useEffect(() => {
    nickname && !validation_nickname() ? setIsNickname(true) : setIsNickname(false);
  }, [nickname, validation_nickname]);

  useEffect(() => {
    if (isNickname) setSignup(true);
    else setSignup(false);
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
            label="닉네임은 한글로 최대 6글자까지 🥕"
            name="nickname"
            onChange={onChange}
            error={validation_nickname()}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="warning"
            endIcon={<ArrowForwardIcon />}
            disabled={validation_nickname()}
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
  justify-content: space-between;
  align-items: center;
  margin: auto;
  padding: 2em;
  border-radius: 1em;
`;

export default JoinForm;
