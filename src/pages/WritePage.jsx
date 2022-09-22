import React, { useState } from "react";
import styled from "styled-components";
import Write from "../components/write/Write";
import { instance } from "../api/request";

const WritePage = () => {
  const [title, setTitle] = useState("");
  const [foodname, setFoodName] = useState("");
  const [ingredient, setIngredient] = useState([]);
  const [image, setImage] = useState([]);
  const [time, setTime] = useState("");
  //이미지랑 같이 보낼려면 ! -> 마크다운형식으로 고쳐보자
  const [content, setContent] = useState("");
  // const [markdown, setMarkdown] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const data = {
      title: title,
      foodname: foodname,
      ingredient: ingredient,
      time: time,
      content: content,
      image: image,
    };
    console.log(data);
    await instance.post("http://15.164.216.199/api/auth/post", data);
  };
  return (
    <div>
      <Write
        onSubmitHandler={onSubmitHandler}
        setTitle={setTitle}
        setFoodName={setFoodName}
        setIngredient={setIngredient}
        setTime={setTime}
        setContent={setContent}
        // setMarkdown={setMarkdown}
        setImage={setImage}
      />
    </div>
  );
};

export default WritePage;
