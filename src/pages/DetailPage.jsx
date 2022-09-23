import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import CommentList from "../components/comment/CommentList";
import { instance } from "../api/request";
import Detail from "../components/detail/Detail";
import Tag from "../components/common/Tag";

function DetailPage() {
  const postId = useParams().id;
  const [detail, setDetail] = useState();
  const navigate = useNavigate();

  const getData = async () => {
    const data = await instance.get(`/api/post/${postId}`);
    console.log("데이터 가져오기", data);
    setDetail(data?.data.data);
  };

  useEffect(() => {
    getData();
  }, []);

  console.log("스테이트에 저장", detail);

  const { title, nickname, likeNum, ingredient, foodImg, createAt, content } =
    detail;

  console.log("제목", title);

  const foodName = ingredient?.find(
    (ingredient) => ingredient.isName === true
  ).ingredientName;

  const foodIngredientList = ingredient
    ?.map((ingredient) =>
      ingredient.isName !== true ? ingredient.ingredientName : undefined
    )
    .filter((ingredient) => ingredient !== undefined);

  return (
    <div>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        홈으로
      </button>
      <div>
        <div>#요리이름:{foodName}</div>
        <button>수정</button>
        <button>삭제</button>
      </div>

      <div>
        <div>제목:{title}</div>
        <div>작성자:{nickname}</div>
      </div>

      {foodIngredientList.map((ingredient, idx) => (
        <Tag tagName={ingredient} key={idx} />
      ))}
      <div>
        <img src={foodImg}></img>
      </div>
      <div>작성날짜:{createAt}</div>
      <div>조아요</div>
      <div>{likeNum}</div>

      <div>내용:{content}</div>
      <CommentList />
    </div>
  );
}

export default DetailPage;
