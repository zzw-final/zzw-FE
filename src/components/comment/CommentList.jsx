import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getComments } from "../../redux/modules/commentSlice";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

const CommentList = ({ postId }) => {
  const [commentList, setcommentList] = useState("");
  const dispatch = useDispatch();

  const comments = useSelector((store) => store.comment.comments);

  useEffect(() => {
    // dispatch(getComments(postId));
    dispatch(getComments()); // 임시 🐥
  }, []);

  useEffect(() => {
    setcommentList(comments);
  }, [comments]);

  return (
    <CommentsConatiner>
      <CommentForm postId={postId} />
      {commentList &&
        Array.from(commentList).map((comment) => {
          return (
            <CommentItem
              commentItem={comment}
              key={comment.commentId}
              postId={postId}
            />
          );
        })}
    </CommentsConatiner>
  );
};

const CommentsConatiner = styled.div``;

export default CommentList;
