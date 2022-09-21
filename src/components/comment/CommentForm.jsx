import React, { useState } from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { postComment } from "../../redux/modules/commentSlice";

const CommentForm = ({ postId }) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  // 로그인 유저 정보 세션으로부터 받기
  const commentId = Math.random();
  const img =
    "https://i.pinimg.com/474x/08/c6/d8/08c6d89c4049d7063c0b5b6167cbd566.jpg";
  const nickname = "moon";
  const grade = "징징이";

  console.log("comment :>> ", comment);

  const sendData = {
    postId: postId,
    comment: comment,
    img: img,
    nickname: nickname,
    grade: grade,
    createdAt: Date.now(),
  };

  const post = () => {
    dispatch(postComment(sendData));
    setComment("");
  };

  const onChange = (event) => {
    return setComment(event.target.value);
  };

  return (
    <FormContainer>
      <TextField
        id="outlined-start-adornment"
        name="comment"
        value={comment}
        fullWidth
        onChange={onChange}
        size="small"
      />
      <Button variant="outlined" sx={{ p: 0, ml: 1 }} onClick={post}>
        댓글 달기
      </Button>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  display: flex;
  margin: 0.4em;
`;

export default CommentForm;
