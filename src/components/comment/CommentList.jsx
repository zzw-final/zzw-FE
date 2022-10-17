import React from "react";
import styled from "styled-components";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

const CommentList = ({ postId, post, remove, update, commentList }) => {
  return (
    <>
      <CommentsConatiner>
        {commentList &&
          Array.from(commentList).map((comment) => {
            return <CommentItem commentItem={comment} key={comment.commentId} remove={remove} update={update} />;
          })}
      </CommentsConatiner>
      {postId && <CommentForm postId={postId} post={post} />}
    </>
  );
};

const CommentsConatiner = styled.div`
  text-align: left;
  height: 100%;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 0.3rem;
  }
  ::-webkit-scrollbar-thumb {
    background-color: var(--color-orange);
    border-radius: 10px;
  }
  ::-webkit-scrollbar-track {
    margin-top: 1.3rem;
    background-color: var(--color-white);
  }
`;

export default CommentList;
