import React, { useCallback, useEffect, useState } from "react";
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
import useAxios from "../../hooks/useAxios";

const CommentList = () => {
  const [commentList, setCommentList] = useState();
  const postId = useParams().id;

  const [commentData, commentDataFetcher] = useAxios();

  useEffect(() => {
    async function fetchData() {
      const comments = await getComments(postId);
      setCommentList(comments);
    }
    fetchData();
  }, [postId]);

  function post(postInfo) {
    // const newPost = await postComment(postInfo);
    const comment = {
      comment: postInfo.comment,
    };
    commentDataFetcher(
      "post",
      `/api/auth/post/${postInfo.postId}/comment`,
      comment
    );

    // setCommentList((prev) => [newPost, ...prev]);
  }

  console.log("commentData2", commentData);

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
