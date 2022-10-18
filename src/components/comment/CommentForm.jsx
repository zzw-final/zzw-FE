import React from "react";
import styled from "styled-components";
import Button from "../UI/Button";
import { useCookies } from "react-cookie";
import useInputRef from "../../hooks/useInputRef";
import { Avatar } from "@mui/material";

const CommentForm = ({ postId, post }) => {
  const [cookies] = useCookies(["loginProfile", "loginNickname"]);
  const loginProfile = cookies.loginProfile;
  const loginNickname = cookies.loginNickname;

  const postComment = () => {
    if (loginProfile === undefined) {
      alert("로그인 유저만 댓글을 달 수 있습니다.");
      return;
    }
    if (commentRef.current.value === "") {
      alert("빈 값은 입력할 수 없습니다.");
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
  const commentRef = useInputRef("", postComment);

  return (
    <FormContainer>
      <Avatar alt="user_img" src={loginProfile} sx={{ width: 28, height: 28 }} />
      <CommentInput ref={commentRef} placeholder={` ${loginNickname}(으)로 댓글 달기`} />
      <Button name="commonBtn" onClick={postComment} width="5rem" height="2rem" backgroundColor="var(--color-orange)">
        등록
      </Button>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0.4rem;
`;

const CommentInput = styled.input`
  width: 100%;
  height: 4vh;
  margin: 0.5rem;
  padding: 0.2rem;
  border: 0.5px solid var(--color-orange);
  border-radius: 0.5rem;
`;

export default CommentForm;
