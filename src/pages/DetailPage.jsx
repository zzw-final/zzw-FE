import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { options } from "../api/options";
import { useNavigate, useParams } from "react-router-dom";
import { imgInstance, instance } from "../api/request";
import LayoutPage from "../components/common/LayoutPage";
import Detail from "../components/detail/Detail";
import styled from "styled-components";
import {
  fetchDetail,
  fetchDelete,
  fetchEdit,
  fetchImg,
} from "../api/writepage";

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

  const queryClient = useQueryClient();

  //기존 데이터 가져오는 useQuery
  const { data: postDetail } = useQuery(
    ["detail", id],
    () => fetchDetail(id),
    options.eternal
  );

  //이미지 업로드 시 url 반환요청
  const imgUpload = async (file) => {
    const formdata = new FormData();
    formdata.append("file", file);
    return fetchImg(formdata);
  };

  //게시글 삭제
  const delteMutate = useMutation((id) => fetchDelete(id), {
    onSuccess: () => {
      alert("삭제되었습니다.");
      navigate(-1);
    },
  });

  const onDeleteHandler = () => {
    if (window.confirm("작성 글을 삭제하시겠습니까?")) {
      delteMutate.mutate(id);
    }
  };
  //게시글 수정
  const editMutate = useMutation((sendData) => fetchEdit(sendData), {
    onSuccess: () => {
      alert("글 수정이 완료되었습니다!");
      navigate(`/`); //여기 해당 디테일페이지로 이동하게 수정하기
    },
  });

  const onSubmitHandler = async () => {
    const data = {
      title: editedTitle || postDetail?.title,
      foodName: editedFoodname || postDetail?.ingredient[0].ingredientName,
      ingredient: editedIngredient || foodIngredientList,
      imageUrl: editedImageUrl || postDetail?.foodImg,
      time: editTime || postDetail?.time + `분`,
      pageList: editedValues,
    };
    const sendData = { id, data };
    editMutate.mutate(sendData);
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
        console.log("Detail page editForm ", data);
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

  const likeToggle = async (postId) => {
    return await instance.post(`/api/auth/post/${postId}`);
  };

  // const { mutate } = useMutation(likeToggle, {
  //   onMutate: async (postId) => {
  //     await queryClient.cancelQueries(["detail", id]);
  //     const previousData = queryClient.getQueryData(["detail", id]);
  //     queryClient.setQueryData(["detail", id], (prevData) => {
  //       console.log("prevData :>> ", prevData);
  // return { ...prevData?.data.data, isLike: !prevData?.data.data.isLike };
  //       return {
  //         ...prevData,
  //         isLike: !prevData.data.data.isLike,
  //       };
  //     });
  //     return previousData;
  //   },
  //   onSuccess: async (data, postId) => {
  //     // console.log("data detailPage > ", data);
  //     // console.log("data detailPage  postId> ", postId);
  //   },
  // });

  const foodIngredientList = postDetail?.ingredient
    ?.map((ingredient) =>
      ingredient.isName !== true ? ingredient.ingredientName : undefined
    )
    .filter((ingredient) => ingredient !== undefined);

  useEffect(() => {
    setEditedvalues(postDetail?.contentList);
  }, [postDetail?.contentList]);

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

  return (
    <LayoutPage background={"#fbd499"}>
      <DetailContainer>
        {editedValues && (
          <Detail
            postDetail={postDetail}
            onDelete={onDeleteHandler}
            id={id}
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
            setEditedIngredient={setEditedIngredient}
          />
        )}
      </DetailContainer>
    </LayoutPage>
  );
}

const DetailContainer = styled.div`
  /* height: 100vh; */
  height: calc(var(--vh, 1vh) * 100 - 56px);
  height: auto;
  margin-bottom: 60px;
  /* height: calc(var(--vh, 1vh) * 100 + 56px); */
`;

export default DetailPage;
