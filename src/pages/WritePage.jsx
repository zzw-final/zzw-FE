import React, { useEffect } from "react";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { fetchImg, fetchpostWrite } from "../api/writepage";
import LayoutPage from "../components/common/LayoutPage";
import Spinner from "../components/UI/Spinner";
import WriteAddCard from "../components/write/WriteAddCard";
import WriteTitle from "../components/write/WriteTitle";

function WritePage() {
  //WriteTitle에서 값을 받을 State
  const [title, setTitle] = useState("");
  const [foodname, setFoodName] = useState("");
  const [ingredient, setIngredient] = useState([]);
  const [time, setTime] = useState("5분");
  const [imageURL, setImageURL] = useState(
    "https://user-images.githubusercontent.com/110365677/195768702-db712364-f837-45c6-9adf-aee6d195dadb.png"
  );
  const [res, setRes] = useState();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  // WriteAddCard에서 값을 받을 state
  const [formValues, setFomvalues] = useState([{ imageUrl: "", content: "", page: 0 }]);

  //받은값 전부를 post => mutate로 리팩토링
  const postMutate = useMutation((data) => fetchpostWrite(data), {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["mypage", "myRecipes"]);
      queryClient.invalidateQueries(["mypage", "likeRecipes"]);
      queryClient.invalidateQueries(["mainPage", "recentPost"]);
      if (data.data.data.isGet) {
        alert("🎉 새로운 칭호를 획득했습니다! 마이페이지에서 확인하세요.");
        queryClient.invalidateQueries(["mypage", "profile"]);
      }
      alert("게시글 등록이 완료되었습니다!");
      navigate(`/detail/${data.data.data.postId}`);
      window.sessionStorage.clear();
      window.localStorage.clear();
    },
  });

  const submit = () => {
    const data = {
      title: title,
      foodName: foodname,
      imageUrl: imageURL,
      ingredient: ingredient,
      time: time,
      pageList: formValues,
    };
    if (title === "") {
      return alert("제목을 입력해주세요❗️");
    }
    if (foodname === "") {
      return alert("요리이름을 입력해주세요❗️");
    }
    if (
      imageURL ===
      "https://user-images.githubusercontent.com/110365677/195768702-db712364-f837-45c6-9adf-aee6d195dadb.png"
    ) {
      return alert("필수이미지를 추가해주세요❗️");
    }
    if (ingredient.length === 0) {
      return alert("재료 태그를 추가해주세요❗️");
    }
    if (!formValues.every((item) => !!item.content)) {
      return alert("비어있는 항목이 있습니다!");
    }
    postMutate.mutate(data);
  };

  //이미지 파일 업로드시 url로 변경해주는 post
  const imgUpload = async (file) => {
    const formdata = new FormData();
    formdata.append("file", file);
    return fetchImg(formdata);
  };

  const outconfirm = () => {
    window.sessionStorage.clear();
    window.localStorage.clear();
  };

  // 얘가 언디파인드이면 전부 다 비어있다는 뜻. -> 얼럿 실행
  // console.log(formValues.every((item) => !!item.content));

  useEffect(() => {
    return outconfirm;
  }, []);

  // 로딩 시 스피너
  if (postMutate.isLoading) return <Spinner />;

  return (
    <LayoutPage
      headerTitle="레시피 작성"
      backBtnTypeArrow="true"
      isBtn="true"
      buttonText="등록"
      buttonEvent={submit}
    >
      <WriteTitle
        setTitle={setTitle}
        setFoodName={setFoodName}
        setIngredient={setIngredient}
        setTime={setTime}
        imageURL={imageURL}
        imgUpload={imgUpload}
        setImageURL={setImageURL}
      />
      <WriteAddCard imgUpload={imgUpload} formValues={formValues} setFomvalues={setFomvalues} />
    </LayoutPage>
  );
}

export default WritePage;
