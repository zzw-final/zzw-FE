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
        throw new Error(`${action} 에 해당하는 캐시무효화 작업이 없습니다.`);
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
        throw new Error(`${type} 을 확인해주세요.`);
    }
  };

  // 공유 기능
  const copyUrl = async () => {
    setToast(true);
    await navigator.clipboard.writeText(url);
  };

  //기존 데이터 가져오는 useQuery
  const { data: postDetail, isLoading: loadingDetailData } = useQuery(
    ["detail", id],
    () => fetchDetail(id),
    options.eternal
  );

  //이미지 업로드 시 url 반환요청
  const imgUpload = async (file) => {
    const formdata = new FormData();
    formdata.append("file", file);
    return await fetchImg(formdata);
  };

  //게시글 삭제
  const delteMutate = useMutation((id) => fetchDelete(id), {
    onSuccess: () => {
      alert("삭제되었습니다.");
      setInvalidateQueries("delete");
      navigate("/");
    },
  });

  const onDelete = () => {
    if (window.confirm("작성 글을 삭제하시겠습니까?")) {
      delteMutate.mutate(id);
    }
  };

  //게시글 수정
  const editMutate = useMutation((sendData) => fetchEdit(sendData), {
    onSuccess: () => {
      alert("글 수정이 완료되었습니다!");
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
      time: editTime || postDetail?.time + `분`,
      pageList: editedValues,
    };
    const sendData = { id, data };
    editMutate.mutate(sendData);
  };

  //재료만 뽑아줌
  const foodIngredientList = postDetail?.ingredient
    ?.map((ingredient) => (ingredient.isName !== true ? ingredient.ingredientName : undefined))
    .filter((ingredient) => ingredient !== undefined);

  // 2p~10p 데이터
  useEffect(() => {
    setEditedValues(postDetail?.contentList);
  }, [postDetail?.contentList]);

  //디테일 페이지 내에서 팔로우 기능
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

  //댓글 데이터 가져오는 useQuery
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
        alert("🎉 새로운 칭호를 획득했습니다! 마이페이지에서 확인하세요.");
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
      {toast && <Toast setToast={setToast} text="클립보드에 복사되었습니다." />}
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
