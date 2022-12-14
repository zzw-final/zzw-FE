import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { options } from "../api/options";
import { useNavigate, useParams } from "react-router-dom";
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
  fetchFollowDe,
} from "../api/writepage";
import Spinner from "../components/UI/Spinner";
import { DetailContext } from "../context/DetailContext";

function DetailPage() {
  const [editedIngredient, setEditedIngredient] = useState();
  const [editedTitle, setEditedTitle] = useState();
  const [editedFoodname, setEditedFoodname] = useState();
  const [editedImageUrl, setEditedImageUrl] = useState();
  const [editTime, setEditTime] = useState();
  const [editedValues, setEditedValues] = useState();
  const [toast, setToast] = useState(false);

  const { id } = useParams();
  const url = window.location.href;

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const setInvalidateQueries = (action) => {
    switch (action) {
      case "delete":
        queryClient.invalidateQueries(["mypage", "myRecipes"]);
        queryClient.invalidateQueries(["mypage", "likeRecipes"]);
        queryClient.invalidateQueries(["mainPage"]);
        break;
      case "edit":
        queryClient.invalidateQueries(["mypage", "myRecipes"]);
        queryClient.invalidateQueries(["mypage", "likeRecipes"]);
        queryClient.invalidateQueries(["mainPage"]);
        queryClient.invalidateQueries(["detail", id]);
        break;
      case "follow":
        queryClient.invalidateQueries(["detail", id]);
        queryClient.invalidateQueries(["userpage", "profile"]);
        queryClient.invalidateQueries(["mypage", "profile"]);
        queryClient.invalidateQueries(["follow"]);
        queryClient.invalidateQueries(["follower"]);
        queryClient.invalidateQueries(["mainPage", "infinite"]);
        break;
      case "comment":
        queryClient.invalidateQueries(["comment", id]);
        break;
      case "profile":
        queryClient.invalidateQueries(["mypage", "profile"]);
        break;
      default:
        throw new Error(`${action} ??? ???????????? ??????????????? ????????? ????????????.`);
    }
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
        throw new Error(`${type} ??? ??????????????????.`);
    }
  };

  // ?????? ??????
  const copyUrl = async () => {
    setToast(true);
    await navigator.clipboard.writeText(url);
  };

  //?????? ????????? ???????????? useQuery
  const { data: postDetail, isLoading: loadingDetailData } = useQuery(
    ["detail", id],
    () => fetchDetail(id),
    options.eternal
  );

  //????????? ????????? ??? url ????????????
  const imgUpload = async (file) => {
    const formdata = new FormData();
    formdata.append("file", file);
    return await fetchImg(formdata);
  };

  //????????? ??????
  const delteMutate = useMutation((id) => fetchDelete(id), {
    onSuccess: () => {
      alert("?????????????????????.");
      setInvalidateQueries("delete");
      navigate("/");
    },
  });

  const onDelete = () => {
    if (window.confirm("?????? ?????? ?????????????????????????")) {
      delteMutate.mutate(id);
    }
  };

  //????????? ??????
  const editMutate = useMutation((sendData) => fetchEdit(sendData), {
    onSuccess: () => {
      alert("??? ????????? ?????????????????????!");
      navigate(`/detail/${id}`);
      setInvalidateQueries("edit");
    },
  });

  const onSubmitHandler = async () => {
    const data = {
      title: editedTitle || postDetail?.title,
      foodName: editedFoodname || postDetail?.ingredient[0].ingredientName,
      ingredient: editedIngredient || foodIngredientList,
      imageUrl: editedImageUrl || postDetail?.foodImg,
      time: editTime || postDetail?.time + `???`,
      pageList: editedValues,
    };
    const sendData = { id, data };
    editMutate.mutate(sendData);
  };

  //????????? ?????????
  const foodIngredientList = postDetail?.ingredient
    ?.map((ingredient) => (ingredient.isName !== true ? ingredient.ingredientName : undefined))
    .filter((ingredient) => ingredient !== undefined);

  // 2p~10p ?????????
  useEffect(() => {
    setEditedValues(postDetail?.contentList);
  }, [postDetail?.contentList]);

  //????????? ????????? ????????? ????????? ??????
  const [greyButton, setGreyButton] = useState(postDetail?.isFollow);

  const { mutate } = useMutation((postId) => fetchFollowDe(postId), {
    onSuccess: () => {
      setInvalidateQueries("follow");
    },
  });

  const followHandler = async () => {
    setGreyButton((prev) => !prev);
    mutate(id);
  };

  //?????? ????????? ???????????? useQuery
  const { data: commentList } = useQuery(["comment", id], () => commentFetch(id), options.eternal);

  const post = (postInfo) => {
    commentPostMutate.mutate(postInfo);
  };

  const update = (updateInfo) => {
    commentUpdateMutate.mutate(updateInfo);
  };

  const remove = (commentId) => {
    commentDeleteMutate.mutate(commentId);
  };

  const commentPostMutate = useMutation((postInfo) => commentPost(postInfo), {
    onSuccess: (res) => {
      if (res.data.data.isGet) {
        alert("???? ????????? ????????? ??????????????????! ????????????????????? ???????????????.");
        setInvalidateQueries("profile");
      }
      setInvalidateQueries("comment");
    },
  });

  const commentDeleteMutate = useMutation((commentId) => commentDelete(commentId), {
    onSuccess: setInvalidateQueries("comment"),
  });

  const commentUpdateMutate = useMutation((updateInfo) => commentUpdate(updateInfo), {
    onSuccess: setInvalidateQueries("comment"),
  });

  if (loadingDetailData || delteMutate.isLoading || editMutate.isLoading) return <Spinner />;

  return (
    <LayoutPage
      isShare="true"
      copyUrl={copyUrl}
      headerTitle={postDetail?.ingredient[0]?.ingredientName}
    >
      {toast && <Toast setToast={setToast} text="??????????????? ?????????????????????." />}
      <DetailContext.Provider
        value={{
          postDetail,
          id,
          commentList,
          post,
          remove,
          update,
          greyButton,
          followHandler,
          onDelete,
          imgUpload,
          editedValues,
          setEditedValues,
          onSubmitHandler,
          setEditedIngredient,
          editForm,
        }}
      >
        <DetailContainer>{editedValues && <Detail />}</DetailContainer>
      </DetailContext.Provider>
    </LayoutPage>
  );
}

const DetailContainer = styled.div`
  height: calc(var(--vh, 1vh) * 100 - 56px);
  height: auto;
  margin-bottom: 110px;
`;

export default DetailPage;
