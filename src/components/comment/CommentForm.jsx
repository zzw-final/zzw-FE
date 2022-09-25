import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import { useCookies } from "react-cookie";

const CommentForm = ({ postId, post }) => {
  const [cookies] = useCookies(["loginProfile"]);
  const commentRef = useRef("");
  const loginProfile = cookies.loginProfile;

  useEffect(() => {
    commentRef.current.focus();
  }, []);

  const postComment = () => {
    if (loginProfile === undefined) {
      alert("로그인 유저만 댓글을 달 수 있습니다.");
      return;
    }
    const sendData = {
      postId: postId,
      comment: commentRef.current.value,
      profile: loginProfile,
    };
    post(sendData);
    commentRef.current.value = "";
  };

  useEffect(() => {
    commentRef.current.addEventListener("keypress", logKey);
    function logKey(event) {
      if (event.code === "Enter") {
        postComment();
      }
    }
  }, []);

  return (
    <FormContainer>
      <CommentInput ref={commentRef} />
      <Button variant="outlined" sx={{ p: 0, ml: 1 }} onClick={postComment}>
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
