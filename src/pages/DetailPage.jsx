import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { instance } from "../api/request";
import LayoutPage from "../components/common/LayoutPage";
import Detail from "../components/detail/Detail";

function DetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [commentList, setCommentList] = useState();

  const fetchDetail = async () => {
    return await instance.get(`/api/post/${id}`);
  };

  const detail = useQuery(["detail", id], fetchDetail, {
    staleTime: Infinity, // 항상 신선한 데이터로 취급
    select: (data) => data.data.data, // 요청 성공시 데이터 가공
  });

  const postDetail = detail.data;

  useEffect(() => {
    async function fetchData() {
      const comments = await (
        await instance.get(`/api/post/${id}`)
      ).data.data.commentList;
      setCommentList(comments);
    }
    fetchData();
  }, [id]);

  async function post(postInfo) {
    const comment = {
      comment: postInfo.comment,
    };
    console.log("comment > ", comment);
    const res = await instance.post(
      `/api/auth/post/${postInfo.postId}/comment`,
      comment
    );
    console.log("res > ", res);
    const newPost = {
      ...res.data.data,
      postId: postInfo.postId,
      profile: postInfo.profile,
    };
    console.log("newPost > ", newPost);
    console.log("commentList > ", commentList);
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

  const onDeleteHandler = async () => {
    if (window.confirm("작성 글을 삭제하시겠습니까?")) {
      await instance.delete(`/api/auth/post/${id}`);
      alert("삭제되었습니다.");
      navigate("/");
    }
  };

  const likeToggle = async (postId) => {
    return await instance.post(`/api/auth/post/${postId}`);
  };

  return (
    <LayoutPage background={"#fbd499"}>
      <Detail
        postDetail={postDetail}
        onDelete={onDeleteHandler}
        post={post}
        remove={remove}
        update={update}
        commentList={commentList}
        likeToggle={likeToggle}
      />
    </LayoutPage>
  );
}

export default DetailPage;
