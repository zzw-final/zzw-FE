import React, { useState } from "react";
import styled from "styled-components";
import Write from "../components/write/Write";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const WritePage = () => {
  const [title, setTitle] = useState("");
  const [foodname, setFoodName] = useState("");
  const [ingredient, setIngredient] = useState([]);
  const [image, setImage] = useState([]);
  const [time, setTime] = useState("");
  //이미지랑 같이 보낼려면 ! -> 마크다운형식으로 고쳐보자
  const [content, setContent] = useState("");

  const navigate = useNavigate();

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
    await axios.post(
      "https://5bba5794-6cae-4b98-83a1-edd9ebc9483a.mock.pstmn.io/api/auth/post",
      data
    );
    navigate("/");
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
        setImage={setImage}
      />
    </div>
  );
};

export default WritePage;
