import React from "react";
import styled from "styled-components";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

const CommentList = ({ postId, post, remove, update, commentList }) => {
  console.log("commentList 리스트 페이지", commentList);

  return (
    <CommentsConatiner>
      {postId && <CommentForm postId={postId} post={post} />}
      {commentList &&
        Array.from(commentList).map((comment) => {
          return (
            <CommentItem
              commentItem={comment}
              key={comment.commentId}
              remove={remove}
              update={update}
            />
          );
        })}
    </CommentsConatiner>
  );
};

const CommentsConatiner = styled.div``;

export default CommentList;
