import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { postComment } from "../../redux/modules/commentSlice";
import { useCookies } from "react-cookie";

const CommentForm = ({ postId }) => {
  const [cookies] = useCookies(["loginProfile"]);
  const dispatch = useDispatch();
  const commentRef = useRef("");
  const loginProfile = cookies.loginProfile;

  useEffect(() => {
    commentRef.current.focus();
  }, []);

  const post = () => {
    if (loginProfile === undefined) {
      alert("로그인 유저만 댓글을 달 수 있습니다.");
      return;
    }
    const sendData = {
      postId: postId,
      comment: commentRef.current.value,
      profile: loginProfile,
    };
    dispatch(postComment(sendData));
    commentRef.current.value = "";
  };

  useEffect(() => {
    commentRef.current.addEventListener("keypress", logKey);
    function logKey(event) {
      if (event.code === "Enter") {
        post();
      }
    }
  }, []);

  return (
    <FormContainer>
      <CommentInput ref={commentRef} />
      <Button variant="outlined" sx={{ p: 0, ml: 1 }} onClick={post}>
        댓글 달기
      </Button>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  display: flex;
  margin: 0.4rem;
`;

const CommentInput = styled.input`
  width: 100%;
  height: 4vh;
`;

export default CommentForm;
