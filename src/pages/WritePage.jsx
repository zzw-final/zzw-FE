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
  //이미지랑 같이 보낼려면 ! -> html을 고대로 넘겨주시며누되시거든요?
  // 그다음에 어차피 에디터로띄워줄거잖아요? 수정할때에는?
  // 그리고 그냥 상세보기햇을때에는 그냥 .... 어쩌구
  // 그런데 html을 서버로 그넝 넘기면 보안이슈가잇습니다 그래서 땡땡처리를하고넘겨주는디 직접찾아보시면좋겟
  const [content, setContent] = useState("");
  // const [markdown, setMarkdown] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const data = {
        title: title,
        foodName: foodname,
        ingredient: [{ ingredientName: "양파" }, { ingredientName: "파" }], //객체로 수정
        time: Number(time),
        content: content,
        // image:
        //   "https://i.pinimg.com/236x/f0/82/3c/f0823c54bb92aec76f2959d88a0c42a5.jpg",
      };
      console.log(data);
      await instance.post("/api/auth/post", data);
    } catch (error) {
      console.log("에러..", error);
    }
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
