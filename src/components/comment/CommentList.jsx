import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import {
  getComments,
  postComment,
  deleteComment,
  updateComment,
} from "../../api/request";

const CommentList = () => {
  const [commentList, setCommentList] = useState([]);
  const postId = useParams().id;

  useEffect(() => {
    async function fetchData() {
      const comments = await getComments(postId);
      setCommentList(comments);
    }
    fetchData();
  }, [postId]);

  async function post(postInfo) {
    const newPost = await postComment(postInfo);
    setCommentList((prev) => [newPost, ...prev]);
  }

  async function remove(commentId) {
    const deletedCommentId = await deleteComment(commentId);
    setCommentList((prev) =>
      prev.filter((comment) => comment.commentId !== deletedCommentId)
    );
  }

  async function update(updatedInfo) {
    const updatedPost = await updateComment(updatedInfo);
    setCommentList((prev) =>
      prev.map((item) =>
        item.commentId === updatedPost.commentId
          ? { ...item, comment: updatedPost.comment }
          : item
      )
    );
  }

  return (
    <CommentsConatiner>
      <CommentForm postId={postId} post={post} />
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
