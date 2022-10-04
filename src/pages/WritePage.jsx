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
  // const [content, setContent] = useState("");
  const [imageURL, setImageURL] = useState("");
  const navigate = useNavigate();

  const [pageDataList, setPageDataList] = useState([]);
  const [pageData, setPageData] = useState({});

  console.log("pageDataList", pageDataList);

  // const [pageData, setPageData] = useState({});
  // const [pageDataImg, setPageDataImg] = useState("");
  // const [pageDataContent, setPageDataContent] = useState("");
  // const [pageDataCnt, setPageDataCnt] = useState(0);

  //post
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("pageDataList :>> ", pageDataList);
    try {
      const data = {
        title: title,
        foodName: foodname,
        imageUrl: imageURL,
        ingredient: ingredient,
        time: time,
        pageList: pageDataList,
      };
      // console.log(data);
      // await instance.post("/api/auth/post", data);
      // alert("게시글 등록이 완료되었습니다!");
      // navigate("/");
    } catch (error) {
      console.log("에러..", error);
    }
  };

  const getPageData = (sendData) => {
    console.log("sendData :>> ", sendData.page);

    console.log(
      "find >",
      pageDataList.find((i) => i.page === sendData.page)
    );

    if (pageDataList.find((i) => i.page === sendData.page) === undefined) {
    }

    pageDataList.map((i) =>
      i.page === sendData.page
        ? { ...i, imageURL: sendData.imageURL, content: sendData.content }
        : i
    );

    setPageDataList((prev) => [...prev, sendData]);
  };

  console.log();

  const imgUpload = async (e) => {
    e.preventDefault();
    if (e.target.files) {
      const file = e.target.files[0];
      console.log("이미지 파일 받기", file);
      const formdata = new FormData();
      formdata.append("file", file);
      return await imgInstance.post("/api/post/image", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }
  };

  const [list, setList] = useState();

  //레시피 단계 작성 카드 추가
  // const [countList, setCountList] = useState([0]);

  let [cnt, setCnt] = useState(0);

  const onAddCardDiv = () => {
    setCnt(cnt + 1);
    setList((prev) => [
      prev,
      <WriteCard
        key={cnt}
        idx={cnt}
        imgUpload={imgUpload}
        getPageData={getPageData}
      />,
    ]);
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
      {list}
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
  &:hover {
    background: var(--color-dark-white);
    color: white;
  }
`;
