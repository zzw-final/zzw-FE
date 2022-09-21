import React from "react";
import CommentList from "./CommentList";

const CommentPage_del = () => {
  const postId = Math.random();
  return <CommentList postId={postId} />;
};

export default CommentPage_del;
