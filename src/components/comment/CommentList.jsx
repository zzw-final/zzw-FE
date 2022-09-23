import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getComments } from "../../redux/modules/commentSlice";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

const CommentList = () => {
  const [commentList, setcommentList] = useState("");
  const dispatch = useDispatch();

  const comments = useSelector((store) => store.comment.comments);

  const postId = useParams().id;

  useEffect(() => {
    dispatch(getComments(postId));
  }, []);

  useEffect(() => {
    setcommentList(comments);
  }, [comments]);

  return (
    <CommentsConatiner>
      <CommentForm postId={postId} />
      {commentList &&
        Array.from(commentList).map((commentItem) => {
          return (
            <CommentItem
              commentItem={commentItem}
              key={commentItem.commentId}
              postId={postId}
            />
          );
        })}
    </CommentsConatiner>
  );
};

const CommentsConatiner = styled.div``;

export default CommentList;
