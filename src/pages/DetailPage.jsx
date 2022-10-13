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
  commentFetch,
  commentPost,
  commentDelete,
  commentUpdate,
} from "../api/writepage";

function DetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();

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
      navigate(`/`);
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

  //디테일 페이지 좋아요
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

  //재료만 뽑아줌
  const foodIngredientList = postDetail?.ingredient
    ?.map((ingredient) =>
      ingredient.isName !== true ? ingredient.ingredientName : undefined
    )
    .filter((ingredient) => ingredient !== undefined);

  // 2p~10p 데이터
  useEffect(() => {
    setEditedvalues(postDetail?.contentList);
  }, [postDetail?.contentList]);

  //댓글 데이터 가져오는 useQuery
  const { data: commentList } = useQuery(
    ["comment", id],
    () => commentFetch(id),
    options.eternal
  );

  //댓글 작성
  const commentPostMutate = useMutation((postInfo) => commentPost(postInfo), {
    onSuccess: () => {
      queryClient.invalidateQueries("comment", id);
    },
  });

  const post = (postInfo) => {
    commentPostMutate.mutate(postInfo);
  };

  //댓글 삭제
  const commentDeleteMutate = useMutation(
    (commentId) => commentDelete(commentId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("comment", id);
      },
    }
  );
  const remove = (commentId) => {
    commentDeleteMutate.mutate(commentId);
  };

  //댓글 수정

  const commentUpdateMutate = useMutation(
    (updateInfo) => commentUpdate(updateInfo),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("comment", id);
      },
    }
  );
  const update = (updateInfo) => {
    commentUpdateMutate.mutate(updateInfo);
  };

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
  height: calc(var(--vh, 1vh) * 100 - 56px);
  height: auto;
  margin-bottom: 60px;
`;

export default DetailPage;
