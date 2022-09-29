// import { set } from "immer/dist/internal";
import { ConstructionOutlined } from "@mui/icons-material";
import React, { useCallback } from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { instance, imgInstance } from "../api/request";
import LayoutPage from "../components/common/LayoutPage";
import EditContent from "../components/edit/EditContent";
import EditHeader from "../components/edit/EditHeader";
import EditTitle from "../components/edit/EditTitle";

function EditPage() {
  const post_Id = useParams().id;
  const [postDetail, setPostDetail] = useState();

  const [editedIngredient, setEditedIngredient] = useState();
  const [editedTitle, setEditedTitle] = useState();
  const [editedFoodname, setEditedFoodname] = useState();
  const [editedContent, setEditedContent] = useState();
  const [editedImageUrl, setEditedImageUrl] = useState();
  const [editTime, setEditTime] = useState();


  useEffect(() => {
    const getData = async () => {
      await instance
        .get(`/api/post/${post_Id}`)
        .then((res) => setPostDetail(res.data.data));
    };
    getData();
  }, [post_Id]);
  }, []);

 

  const [imageURL, setImageURL] = useState();

  const imgUpload = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const file = e.target.files[0];
      const formdata = new FormData();
      formdata.append("file", file);

      imgInstance
        .post("/api/post/image", formdata, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          setImageURL(res?.data?.data?.imageUrl);
          setEditedImageUrl(imageURL);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    setEditedImageUrl(imageURL);
  }, [imageURL]);

  const onSubmitHandler = async () => {
    const data = {
      // 바뀐 값이 없으면 '' <- 이렇게 보내주고 싶을때 사용. 아래는 예시임.
      // title: postDetail?.title === editedTitle ? "" : editedTitle,

      // 수정이 되었다면, 수정된 값을 넣어줌. 수정 안되었다면, 기존 값을 넣어줌.
      title: editedTitle || postDetail?.title,
      foodName: editedFoodname || postDetail?.ingredient[0].ingredientName,
      ingredient: editedIngredient,
      content: editedContent || postDetail?.content,
      imageUrl: editedImageUrl || postDetail?.foodImg,
      time: editTime || postDetail.time,

    };
    console.log("보내는 수정데이터 확인", data);
    await instance.put(`/api/auth/post/${post_Id}`, data);
    alert("글 수정이 완료되었습니다!");
    navigate(`/detail/${post_Id}`);
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
      case "content":
        setEditedContent(data);
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

  return (
    <LayoutPage>
      <EditHeader onSubmit={onSubmitHandler} />

      {postDetail && <EditTitle editForm={editForm} postDetail={postDetail} />}
      {postDetail && (
        <EditContent
          editForm={editForm}
          imgUpload={imgUpload}
          postDetail={postDetail}
          imageURL={imageURL}
        />
      )}
    </LayoutPage>
  );
}

export default EditPage;
