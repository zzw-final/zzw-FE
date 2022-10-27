import React, { useContext, useRef } from "react";
import styled from "styled-components";
import { DetailContext } from "../../context/DetailContext";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

const CommentList = () => {
  const data = useContext(DetailContext);
  const { id: postId, commentList } = data;

  const scrollRef = useRef();

  return (
    <>
      <CommentsConatiner ref={scrollRef}>
        {commentList &&
          Array.from(commentList).map((comment) => {
            return <CommentItem commentItem={comment} key={comment.commentId} />;
          })}
      </CommentsConatiner>
      {postId && <CommentForm scrollRef={scrollRef} />}
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
