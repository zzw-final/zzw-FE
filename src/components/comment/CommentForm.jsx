import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import Button from "../UI/Button";
import useInputRef from "../../hooks/useInputRef";
import { Avatar } from "@mui/material";
import { DetailContext } from "../../context/DetailContext";
import { getCookie } from "../../util/cookie";

const CommentForm = ({ scrollRef }) => {
  const data = useContext(DetailContext);
  const { id: postId, post } = data;

  const loginProfile = getCookie("loginProfile");
  const loginNickname = getCookie("loginNickname");

  const postComment = () => {
    if (loginProfile === undefined) return alert("로그인 유저만 댓글을 달 수 있습니다.");
    if (commentRef.current.value === "") return alert("빈 값은 입력할 수 없습니다.");

    const sendData = {
      postId: postId,
      comment: commentRef.current.value,
      profile: loginProfile,
    };

    post(sendData);

    commentRef.current.value = "";
  };
  const commentRef = useInputRef("", postComment);

  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  });

  return (
    <FormContainer>
      <Avatar alt="user_img" src={loginProfile} sx={{ width: 28, height: 28 }} />
      <CommentInput
        ref={commentRef}
        placeholder={loginNickname ? ` ${loginNickname}(으)로 댓글 달기` : `로그인하고 댓글 달기`}
      />
      <Button
        name="commonBtn"
        onClick={postComment}
        width="5rem"
        height="2.3rem"
        backgroundColor="var(--color-orange)"
      >
        등록
      </Button>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const CommentInput = styled.input`
  width: 100%;
  height: 2.3rem;
  margin: 0.5rem;
  padding: 1rem;
  border: 0.5px solid var(--color-orange);
  border-radius: 0.5rem;
  font-weight: var(--weight-semi-bold);
  font-size: var(--font-small);
  resize: none;
  line-height: 0.25rem;
`;

export default CommentForm;
