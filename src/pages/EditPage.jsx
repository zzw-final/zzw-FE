// import { set } from "immer/dist/internal";
import { ConstructionOutlined } from "@mui/icons-material";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { instance, imgInstance } from "../api/request";
import LayoutPage from "../components/common/LayoutPage";
import EditContent from "../components/edit/EditContent";
import EditHeader from "../components/edit/EditHeader";
import EditTitle from "../components/edit/EditTitle";

function EditPage() {
  const post_Id = useParams().id;
  const navigate = useNavigate();
  const [postDetail, setPostDetail] = useState();

  useEffect(() => {
    const getData = async () => {
      const data = await instance.get(`/api/post/${post_Id}`);
      setPostDetail(data?.data.data);
    };

    getData();
  }, []);

  // const allIngredientList = postDetail?.ingredient;
  // console.log("배열로", allIngredientList);

  // const foodName = postDetail?.ingredient.find(
  //   (title) => title.isName === true
  // ).ingredientName;
  // const tags = postDetail?.ingredient.filter((title) => title.isName === false);

  // const foodName = allIngredientList?.find((title) => title.isName === true);
  // const tags = allIngredientList?.filter((title) => title.isName === false);

  // console.log("foodName", foodName, tags);

  //서버에서 이미지 url로 받아오는 요청

  const [imageURL, setImageURL] = useState([]);

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
          console.log("이미지 업로드 완료됨", res.data);
          console.log("이미지 URL확인", res.data.data.imageUrl);
          setImageURL(res?.data?.data?.imageUrl);
          editFoodImg(imageURL);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  console.log("이미지값", imageURL);

  useEffect(() => {
    editFoodImg(imageURL);
  }, [imageURL]);

  // const foodName = postDetail?.ingredient.filter(
  //   (title) => title.isName === true
  // );
  // const tags = postDetail?.ingredient.filter((title) => title.isName === false);

  // console.log(postDetail?.ingredient[0]?.ingredientName);
  // const foodName = postDetail?.ingredient[0]?.ingredientName;

  // const foodIngredientList = postDetail?.ingredient?.slice(1);
  // console.log("재료만 잘라온 값", foodIngredientList);

  const onSubmitHandler = async () => {
    const data = {
      title: postDetail?.title,
      // foodName: foodName,
      // ingredient: tags,
      content: postDetail?.content,
      file: postDetail?.foodImg,
    };
    console.log("보내는 수정데이터 확인", data);
    await instance.put(`/api/auth/post/${post_Id}`, data);
  };

  const editTitle = (title) => {
    setPostDetail((prev) => ({ ...prev, title }));
  };

  const editFoodName = (foodName) => {
    setPostDetail((prev) => ({ ...prev, foodName }));
  };

  const editIngredient = (ingredient) => {
    setPostDetail((prev) => ({ ...prev, ingredient }));
  };

  const editContent = (content) => {
    setPostDetail((prev) => ({ ...prev, content }));
  };

  const editFoodImg = (foodImg) => {
    setPostDetail((prev) => ({ ...prev, foodImg }));
  };

  return (
    <LayoutPage>
      <EditHeader onSubmit={onSubmitHandler} />
      {postDetail && (
        <EditTitle
          editTitle={editTitle}
          editFoodName={editFoodName}
          editIngredient={editIngredient}
          // foodName={foodName}
          // tags={tags}
          // foodIngredientList={foodIngredientList}
          postDetail={postDetail}
        />
      )}
      {postDetail && (
        <EditContent
          editContent={editContent}
          postDetail={postDetail}
          imgUpload={imgUpload}
          imageURL={imageURL}
        />
      )}
    </LayoutPage>
  );
}

export default EditPage;
