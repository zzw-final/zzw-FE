import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { instance, imgInstance } from "../api/request";
import Footer from "../components/common/Footer";
import LayoutPage from "../components/common/LayoutPage";
import WriteCard from "../components/write/WriteCard";
import WriteHeader from "../components/write/WriteHeader";
import WriteSwiper from "../components/write/WriteSwiper";
import WriteTitle from "../components/write/WriteTitle";

function WritePage() {
  // const titleRef = useRef("");
  // const foodnameRef = useRef("");
  // const ingredientRef = useRef([]);
  // const timeRef = useRef("");
  // const content = useRef("");
  // const [imageURL, setImageURL] = useState([]);
  // const [ingredient, setIngredient] = useState([]);
  // const navigate = useNavigate();

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
        // title: titleRef.current?.value,
        // foodName: foodnameRef.current?.value,
        // imageURL: imageURL,
        // ingredient: ingredientRef.current?.value,
        // time: timeRef.current?.value,
        // pageList: [
        //   {
        //     imageURL: imageURL,
        //     content: "내용",
        //   },
        // ],
        title: title,
        foodName: foodname,
        imageURL: imageURL,
        ingredient: ingredient,
        time: time,
        pageList: [
          {
            imageURL: imageURL,
            content: "내용",
            page: 1,
          },
        ],
      };
      console.log(data);

      await instance.post("/api/auth/post", data);
      alert("게시글 등록이 완료되었습니다!");
      navigate("/");
    } catch (error) {
      console.log("에러..", error);
    }
  };

  const postData = (title, foodname, ingredient, time, content, imageUrl) => {
    setTitle(title);
    setFoodName(foodname);
    setIngredient(ingredient);
    setTime(time);
    setContent(content);
    setImageURL(imageUrl);
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

  const [countList, setCountList] = useState([0]);

  const onAddCardDiv = () => {
    let countArr = [...countList];
    let counter = countArr.slice(-1)[0];
    counter += 1;
    countArr[counter] = counter;
    setCountList(countArr);
    console.log("추가되는지 찍자", countArr);
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
      <WriteCard
        countList={countList}
        setImageURL={setImageURL}
        imageURL={imageURL}
        imgUpload={imgUpload}
      />
      <div styled={{ margin: "0rem auto" }}>
        <Addbutton onClick={onAddCardDiv}>페이지 추가하기</Addbutton>
      </div>
      {/* <WriteTitle
        titleRef={titleRef}
        foodnameRef={foodnameRef}
        ingredientRef={ingredientRef}
        timeRef={timeRef}
        content={content}
        setImageURL={setImageURL}
        imageURL={imageURL}
        imgUpload={imgUpload}
        setIngredient={setIngredient}
      /> */}
      {/* <WriteSwiper
        titleRef={titleRef}
        foodnameRef={foodnameRef}
        ingredientRef={ingredientRef}
        timeRef={timeRef}
        content={content}
        setImageURL={setImageURL}
        imageURL={imageURL}
        imgUpload={imgUpload}
      /> */}
    </LayoutPage>
  );
}

export default WritePage;

const Addbutton = styled.button`
  background-color: white;
  border: 0;
  width: 80vw;
  height: 5vh;
  border-radius: 10px;
  margin-left: 10vw;
  &:hover{  
    background: var(--color-dark-white);
    color : white;
`;
