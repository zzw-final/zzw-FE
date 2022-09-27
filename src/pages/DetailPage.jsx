import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { instance } from "../api/request";
import LayoutPage from "../components/common/LayoutPage";
import Detail from "../components/detail/Detail";

function DetailPage() {
  const post_Id = useParams().id;
  const [postDetail, setPostDetail] = useState();
  const [commentList, setCommentList] = useState();

  useEffect(() => {
    const getData = async () => {
      const data = await instance.get(`/api/post/${post_Id}`);
      setPostDetail(data.data.data);
    };

    getData();
  }, [post_Id]);

  useEffect(() => {
    async function fetchData() {
      const comments = await (
        await instance.get(`/api/post/${post_Id}`)
      ).data.data.commentList;
      setCommentList(comments);
    }
    fetchData();
  }, [post_Id]);

  async function post(postInfo) {
    const comment = {
      comment: postInfo.comment,
    };
    const res = await instance.post(
      `/api/auth/post/${postInfo.postId}/comment`,
      comment
    );
    const newPost = {
      ...res.data.data,
      postId: postInfo.postId,
      profile: postInfo.profile,
    };
    setCommentList((prev) => [newPost, ...prev]);
  }

  async function remove(commentId) {
    const removed = await instance.delete(
      `/api/auth/post/comment/${commentId}`
    );
    if (removed.data.data === "success delete") {
      const deletedCommentId = commentId;
      setCommentList((prev) =>
        prev.filter((comment) => comment.commentId !== deletedCommentId)
      );
    }
  }

  async function update(updatedInfo) {
    const comment = {
      comment: updatedInfo.comment,
    };
    const res = await instance.put(
      `/api/auth/post/comment/${updatedInfo.commentId}`,
      comment
    );
    if (res.data.success) {
      const updatedPost = updatedInfo;
      setCommentList((prev) =>
        prev.map((item) =>
          item.commentId === updatedPost.commentId
            ? { ...item, comment: updatedPost.comment }
            : item
        )
      );
    }
  }

  return (
    <LayoutPage>
      <Detail
        postDetail={postDetail}
        post={post}
        remove={remove}
        update={update}
        commentList={commentList}
      />
    </LayoutPage>
  );
}

export default DetailPage;
