import React from "react";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
// import styled from "styled-components";
import { getMainInfoWithoutLogin, test } from "../../api/request";

const Main = () => {
  const navigate = useNavigate();
  const [cookies, , removeCookie] = useCookies(["loginNickname"]);

  const loginNickname = cookies.loginNickname;

  // require("react-dom");
  // window.React2 = require("react");
  // console.log(
  //   "window.React1 === window.React2 ?? > ",
  //   window.React1 === window.React2
  // );

  const ttt = getCookie("loginUserId");

  console.log("ttt >>> ", ttt);

  // const test = () => {
  // getMainInfoWithoutLogin();
  // };

  getMainInfoWithoutLogin("leeseul !!!!");

  // useEffect(() => {
  //   test();
  // }, [loginNickname]);

  // useEffect(() => {
  //   async function fetchData() {
  //     // if (loginNickname === undefined) {
  //     // const result = await getMainInfoWithoutLogin();
  //     // } else {
  //     //   console.log("loginNickname:>> ", loginNickname);
  //     // }
  //   }

  //   fetchData();
  // }, [loginNickname]);

  return (
    <></>
    // <MainContainer>
    //   <TagsContainer>tags..</TagsContainer>
    //   <BestRecipeContainer>베스트 👍</BestRecipeContainer>
    //   <NewRecipeContainer>new 레시피</NewRecipeContainer>
    // </MainContainer>
  ); // 태그, 베스트, 최신, 팔로우 목록 모두 가져옴.
};

// 쿠키 읽기
function getCookie(key) {
  key = new RegExp(key + "=([^;]*)"); // 쿠키들을 세미콘론으로 구분하는 정규표현식 정의
  return key.test(document.cookie) ? unescape(RegExp.$1) : ""; // 인자로 받은 키에 해당하는 키가 있으면 값을 반환
}

// const MainContainer = styled.div`
//   padding: 0 5px;
// `;

// const TagsContainer = styled.section``;

// const BestRecipeContainer = styled.section``;

// const NewRecipeContainer = styled.section``;

export default Main;
