import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { instance, imgInstance } from "../api/request";
import Footer from "../components/common/Footer";
import LayoutPage from "../components/common/LayoutPage";
import WriteHeader from "../components/write/WriteHeader";
import WriteTitle from "../components/write/WriteTitle";

function WritePage() {
  const [title, setTitle] = useState("");
  const [foodname, setFoodName] = useState("");
  const [ingredient, setIngredient] = useState([]);
  const [time, setTime] = useState("");
  const [content, setContent] = useState("");
  const [imageURL, setImageURL] = useState([]);
  const navigate = useNavigate();

  //post
  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const data = {
        title: title,
        foodName: foodname,
        imageUrl: imageURL,
        ingredient: ingredient,
        time: time,
        content: content,
      };
      console.log(data);

      await instance.post("/api/auth/post", data);
      alert("게시글 등록이 완료되었습니다!");
      navigate("/");
    } catch (error) {
      console.log("에러..", error);
    }
  };
  //img URL가져오는 요청

  const imgUpload = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const file = e.target.files[0];
      console.log("이미지 파일 받기", file);
      const formdata = new FormData();
      formdata.append("file", file);

      imgInstance
        .post("/api/post/image", formdata, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          console.log("이미지 업로드 완료됨", res.data);
          console.log("이미지 URL확인", res.data.data.imageUrl);
          setImageURL(res.data.data.imageUrl);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <LayoutPage>
      <WriteHeader
        styled={{ position: "fixed" }}
        onSubmitHandler={onSubmitHandler}
      />
      <WriteTitle
        setTitle={setTitle}
        setFoodName={setFoodName}
        setIngredient={setIngredient}
        setTime={setTime}
        setImageURL={setImageURL}
        imageURL={imageURL}
        imgUpload={imgUpload}
      />
    </LayoutPage>
  );
}

export default WritePage;
