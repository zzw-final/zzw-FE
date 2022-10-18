import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { options } from "../api/options";
import { useNavigate, useParams } from "react-router-dom";
import { imgInstance, instance, likes } from "../api/request";
import Toast from "../components/UI/Toast";
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
  likePost,
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
  const [toast, setToast] = useState(false);
  const url = window.location.href;

  // 공유 기능
  const copyUrl = async () => {
    setToast(true);
    await navigator.clipboard.writeText(url);
  };

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
      queryClient.invalidateQueries(["mypage", "myRecipes"]);
      queryClient.invalidateQueries(["mypage", "likeRecipes"]);
      queryClient.invalidateQueries("bestPost");
      queryClient.invalidateQueries("recentPost");
      queryClient.invalidateQueries("followPost");
      queryClient.invalidateQueries("mainpage");
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
      queryClient.invalidateQueries(["mypage", "myRecipes"]);
      queryClient.invalidateQueries(["mypage", "likeRecipes"]);
      queryClient.invalidateQueries("bestPost");
      queryClient.invalidateQueries("recentPost");
      queryClient.invalidateQueries("followPost");
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

  //디테일 페이지 내에서 팔로우 기능
  const [greyButton, setGreyButton] = useState(postDetail?.isFollow);
  const followHandler = async () => {
    setGreyButton((prev) => !prev);
    const data = await instance.post(`/api/post/${postDetail?.postId}/follow`);
    console.log(data);
  };

  useEffect(() => {}, [greyButton]);

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
    <LayoutPage
      isShare="true"
      copyUrl={copyUrl}
      headerTitle={postDetail?.ingredient[0]?.ingredientName}
    >
      {toast && (
        <Toast setToast={setToast} text="🖇 클립보드에 복사되었습니다." />
      )}
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
            imgUpload={imgUpload}
            editedValues={editedValues}
            setEditedValues={setEditedvalues}
            onSubmitHandler={onSubmitHandler}
            editForm={editForm}
            setEditedIngredient={setEditedIngredient}
            greyButton={greyButton}
            followHandler={followHandler}
          />
        )}
      </DetailContainer>
    </LayoutPage>
  );
}

const DetailContainer = styled.div`
  height: calc(var(--vh, 1vh) * 100 - 56px);
  height: auto;
  margin-bottom: 110px;
`;

export default DetailPage;
