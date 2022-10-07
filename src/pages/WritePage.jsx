import React from "react";
import { usememo, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { instance, imgInstance } from "../api/request";
import LayoutPage from "../components/common/LayoutPage";
import WriteAddCard from "../components/write/WriteAddCard";
import WriteCard from "../components/write/WriteCard";
import WriteHeader from "../components/write/WriteHeader";
import WriteTitle from "../components/write/WriteTitle";

function WritePage() {
  //WriteTitle에서 값을 받을 State
  const [title, setTitle] = useState("");
  const [foodname, setFoodName] = useState("");
  const [ingredient, setIngredient] = useState([]);
  const [time, setTime] = useState("5분");
  const [imageURL, setImageURL] = useState("");
  const navigate = useNavigate();

  // WriteAddCard에서 값을 받을 state
  const [formValues, setFomvalues] = useState([{ imageUrl: "", content: "", page: 0 }]);

  //받은값 전부를 post
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = {
        title: title,
        foodName: foodname,
        imageUrl: imageURL,
        ingredient: ingredient,
        time: time,
        pageList: formValues,
      };
      console.log(data);
      await instance.post("/api/auth/post", data);
      alert("게시글 등록이 완료되었습니다!");
      navigate("/");
    } catch (error) {
      console.log("에러..", error);
    }
  };

  //이미지 파일 업로드시 url로 변경해주는 post
  const imgUpload = async (file) => {
    // e.preventDefault();
    const formdata = new FormData();
    formdata.append("file", file);
    return await imgInstance.post("/api/post/image", formdata, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  return (
    <LayoutPage background={"#fbd499"}>
      <WriteHeader styled={{ position: "fixed" }} onSubmitHandler={onSubmitHandler} />
      <WriteTitle
        setTitle={setTitle}
        setFoodName={setFoodName}
        setIngredient={setIngredient}
        setTime={setTime}
        imageURL={imageURL}
        imgUpload={imgUpload}
        setImageURL={setImageURL}
      />
      <Notion>레시피 단계별로 작성해주세요 !😋</Notion>
      <WriteAddCard
        imgUpload={imgUpload}
        formValues={formValues}
        setFomvalues={setFomvalues}
      />
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
  &:hover {
    background: var(--color-dark-white);
    color: white;
  }
`;

const Notion = styled.div`
  margin: 2rem 10vw 1rem 15vw;
`;
