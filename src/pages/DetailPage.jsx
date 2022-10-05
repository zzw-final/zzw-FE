import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { imgInstance, instance } from "../api/request";
import LayoutPage from "../components/common/LayoutPage";
import Detail from "../components/detail/Detail";
import styled from "styled-components";

function DetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [commentList, setCommentList] = useState();

  const [editedIngredient, setEditedIngredient] = useState();
  const [editedTitle, setEditedTitle] = useState();
  const [editedFoodname, setEditedFoodname] = useState();
  const [editedImageUrl, setEditedImageUrl] = useState();
  const [editTime, setEditTime] = useState();
  const [editedValues, setEditedvalues] = useState([
    { imageUrl: "", content: "", page: 0 },
  ]);

  useEffect(() => {
    console.log("editedValues detailPage :>> ", editedValues);
  }, [editedValues]);

  const fetchDetail = async () => {
    return await instance.get(`/api/post/${id}`);
  };

  const { data: postDetail } = useQuery(["detail", id], fetchDetail, {
    staleTime: Infinity,
    select: (data) => data.data.data,
  });

  const foodIngredientList = postDetail?.ingredient
    ?.map((ingredient) =>
      ingredient.isName !== true ? ingredient.ingredientName : undefined
    )
    .filter((ingredient) => ingredient !== undefined);

  console.log("postDetail.time :>> ", postDetail.time);

  const onSubmitHandler = async () => {
    const data = {
      title: editedTitle || postDetail?.title,
      foodName: editedFoodname || postDetail?.ingredient[0].ingredientName,
      ingredient: editedIngredient || foodIngredientList,
      imageUrl: editedImageUrl || postDetail?.foodImg,
      time: editTime || postDetail.time,
      pageList: editedValues || postDetail?.contentList,
    };
    console.log("보내는 수정데이터 확인", data);
    // const result = await instance.put(`/api/auth/post/${id}`, data);
    // console.log("result :>> ", result);
    // alert("글 수정이 완료되었습니다!");
    // navigate(`/detail/${id}`);
  };

  const editForm = (type, data) => {
    switch (type) {
      case "title":
        setEditedTitle(data);
        break;
      case "foodName":
        setEditedFoodname(data);
        break;
      case "ingredient":
        setEditedIngredient(data);
        break;
      case "imageUrl":
        setEditedImageUrl(data);
        break;
      case "time":
        setEditTime(data);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    async function fetchData() {
      const comments = await (
        await instance.get(`/api/post/${id}/comment`)
      ).data.data;
      setCommentList(comments);
    }
    fetchData();
  }, [id]);

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

  const imgUpload = async (e) => {
    e.preventDefault();
    if (e.target.files) {
      const file = e.target.files[0];
      console.log("이미지 파일 받기", file);
      const formdata = new FormData();
      formdata.append("file", file);
      return await imgInstance.post("/api/post/image", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }
  };

  return (
    <LayoutPage background={"#fbd499"}>
      <DetailContainer>
        <Detail
          postDetail={postDetail}
          onDelete={onDeleteHandler}
          post={post}
          remove={remove}
          update={update}
          commentList={commentList}
          likeToggle={likeToggle}
          imgUpload={imgUpload}
          editedValues={editedValues}
          setEditedValues={setEditedvalues}
          onSubmitHandler={onSubmitHandler}
          editForm={editForm}
        />
      </DetailContainer>
    </LayoutPage>
  );
}

const DetailContainer = styled.div`
  height: 100vh;
`;

export default DetailPage;
