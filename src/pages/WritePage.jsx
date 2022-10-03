import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { instance, imgInstance } from "../api/request";
import LayoutPage from "../components/common/LayoutPage";
import WriteCard from "../components/write/WriteCard";
import WriteHeader from "../components/write/WriteHeader";
import WriteTitle from "../components/write/WriteTitle";

function WritePage() {
  const [title, setTitle] = useState("");
  const [foodname, setFoodName] = useState("");
  const [ingredient, setIngredient] = useState([]);
  const [time, setTime] = useState("");
  const [content, setContent] = useState("");
  const [imageURL, setImageURL] = useState("");
  const navigate = useNavigate();

  // const cardData = (pageNum, content1, content2) => {
  //   setPageNum(pageNum);
  //   setContent1(content1);
  //   setContent2(content2);
  // };

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
        pageList: [
          {
            imageURL:
              "https://zzwimage.s3.ap-northeast-2.amazonaws.com/c118f6fd-f373-4c1f-9489-0ecf48bd0a3c.jpeg",
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

  //레시피 단계 작성 카드 추가
  const [countList, setCountList] = useState([0]);

  const onAddCardDiv = () => {
    let countArr = [...countList];
    let counter = countArr.slice(-1)[0];
    counter += 1;
    countArr[counter] = counter;
    setCountList(countArr);
    console.log("추가되는지 찍자", countArr);
    console.log("페이지값", countList);
  };

  return (
    <LayoutPage background={"#fbd499"}>
      <WriteHeader
        styled={{ position: "fixed" }}
        onSubmitHandler={onSubmitHandler}
      />
      <WriteTitle
        setTitle={setTitle}
        setFoodName={setFoodName}
        setIngredient={setIngredient}
        setTime={setTime}
        imageURL={imageURL}
        imgUpload={imgUpload}
      />
      <WriteCard
        countList={countList}
        setImageURL={setImageURL}
        imageURL={imageURL}
        imgUpload={imgUpload}
        setContent={setContent}
      />

      <Addbutton onClick={onAddCardDiv}>페이지 추가하기</Addbutton>
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
