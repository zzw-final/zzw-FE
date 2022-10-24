import React, { useRef } from "react";
import styled from "styled-components";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

const CommentList = ({ postId, post, remove, update, commentList }) => {
  const scrollRef = useRef();

  return (
    <>
      <CommentsConatiner ref={scrollRef}>
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
      {postId && <CommentForm postId={postId} post={post} scrollRef={scrollRef} />}
    </>
  );
};

const CommentsConatiner = styled.div`
  text-align: left;
  height: 100%;
  margin-top: 1.2rem;
  overflow: auto;
  max-height: 400px;
`;

export default CommentList;
