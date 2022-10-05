import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
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
  const [editedValues, setEditedvalues] = useState();

  const fetchDetail = async () => {
    return await instance.get(`/api/post/${id}`);
  };

  const { data: postDetail } = useQuery(["detail", id], fetchDetail, {
    // staleTime: Infinity,
    select: (data) => data.data.data,
  });

  const queryClient = useQueryClient();

  const likeToggle = async (postId) => {
    return await instance.post(`/api/auth/post/${postId}`);
  };

  console.log(" 디테일 페이지 렌더링.. ");

  const { mutate } = useMutation(likeToggle, {
    onMutate: async (postId) => {
      await queryClient.cancelQueries(["detail", id]);
      const previousData = queryClient.getQueryData(["detail", id]);
      queryClient.setQueryData(["detail", id], (prevData) => {
        console.log("prevData :>> ", prevData);
        // return { ...prevData?.data.data, isLike: !prevData?.data.data.isLike };
        return {
          ...prevData,
          isLike: !prevData.data.data.isLike,
        };
      });
      return previousData;
    },
    onSuccess: async (data, postId) => {
      console.log("data detailPage > ", data);
      console.log("data detailPage  postId> ", postId);
    },
  });

  const foodIngredientList = postDetail?.ingredient
    ?.map((ingredient) =>
      ingredient.isName !== true ? ingredient.ingredientName : undefined
    )
    .filter((ingredient) => ingredient !== undefined);

  useEffect(() => {
    setEditedvalues(postDetail?.contentList);
  }, [postDetail?.contentList]);

  const onSubmitHandler = async () => {
    const data = {
      title: editedTitle || postDetail?.title,
      foodName: editedFoodname || postDetail?.ingredient[0].ingredientName,
      ingredient: editedIngredient || foodIngredientList,
      imageUrl: editedImageUrl || postDetail?.foodImg,
      time: editTime || postDetail.time,
      pageList: editedValues,
    };
    console.log("보내는 수정데이터 확인", data);
    const result = await instance.put(`/api/auth/post/${id}`, data);
    console.log("result :>> ", result);
    alert("글 수정이 완료되었습니다!");
    navigate(`/`);
  };

  console.log("setEditedIngredient :>> ", editedIngredient);

  const editForm = (type, data) => {
    switch (type) {
      case "title":
        setEditedTitle(data);
        break;
      case "foodName":
        setEditedFoodname(data);
        break;
      case "ingredient":
        console.log("제발......! ", data);
        setEditedIngredient(data);
        break;
      case "imageUrl":
        console.log("제발......! imgUrl ", data);
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
        {editedValues && (
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
            mutate={mutate}
          />
        )}
      </DetailContainer>
    </LayoutPage>
  );
}

const DetailContainer = styled.div`
  height: 100vh;
`;

export default DetailPage;
