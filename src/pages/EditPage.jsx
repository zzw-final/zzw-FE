import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { instance } from "../api/request";
import LayoutPage from "../components/common/LayoutPage";
import EditHeader from "../components/edit/EditHeader";
import EditTitle from "../components/edit/EditTitle";

function EditPage() {
  const navigate = useNavigate();
  const post_Id = useParams().id;
  //   console.log("params값", post_Id);
  const [postDetail, setPostDetail] = useState();

  //기존데이터 가져오기
  const getData = async () => {
    const data = await instance.get(`/api/post/${post_Id}`);
    setPostDetail(data.data.data);
  };

  useEffect(() => {
    getData();
  }, []);
  //   console.log("데이터값확인", postDetail);

  const onSubmitHandler = async () => {
    const editData = {
      postId: postDetail.postId,
      title: postDetail.title,
      //time값빠졌음
      imageURL: postDetail.imageURL,
      ingredient: postDetail.ingredient,
      content: postDetail.content,
    };
    console.log("수정된데이터 보내기", editData);
    await instance.put(`/api/auth/post/${post_Id}`, editData);
    navigate(`/detail/${post_Id}`);
  };

  const editTitle = (title) => {
    setPostDetail((prev) => ({ ...prev, title }));
  };

  const editImageURL = (ImageURL) => {
    setPostDetail((prev) => ({ ...prev, ImageURL }));
  };

  const editIngredient = (ingredient) => {
    setPostDetail((prev) => ({ ...prev, ingredient }));
  };

  const editfoodName = (foodName) => {
    setPostDetail((prev) => ({ ...prev, foodName }));
  };

  const editTime = (Time) => {
    setPostDetail((prev) => ({ ...prev, Time }));
  };

  const editContent = (content) => {
    setPostDetail((prev) => ({ ...prev, content }));
  };

  return (
    <LayoutPage>
      <EditHeader onSubmit={onSubmitHandler} />
      {postDetail && (
        <EditTitle
          postDetail={postDetail}
          setTitle={editTitle}
          setTime={editTime}
          setFoodName={editfoodName}
          setIngredient={editIngredient}
          setContent={editContent}
          setImage={editImageURL}
        />
      )}
    </LayoutPage>
  );
}

export default EditPage;
