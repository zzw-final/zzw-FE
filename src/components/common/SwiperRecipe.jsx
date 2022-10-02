import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styled from "styled-components";
import "swiper/css/bundle";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import { EffectCards } from "swiper";
import SwiperRecipeItem from "./SwiperRecipeItem";

const SwiperRecipe = () => {
  // const [slide, setSlide] = useState([]);

  // const makeSlide = () => {
  //   setSlide(slide.concat(<SwiperSlide>슬라이드</SwiperSlide>));
  // };

  // 레시피 소개 페이지
  // 사진, 좋아요(수, 기능), 작성자 닉네임, 작성자 칭호, 작성일, 제목
  // 🐥 레시피 상세 정보 보여주기 - 작성자 칭호, 좋아요 여부, 작성자 유저 아이디 필요함!
  // (레시피 전체 페이지 수, 페이지 전체를 리스트로 받으면 필요 없음)

  const IMSIdata = {
    postId: "90012",
    title: "브로콜리 싫어하는 사람도 좋아하는 🥦 브로콜리 🥦 SOUP 레시피",
    nickname: "소울푸드라면",
    profile:
      "https://i.pinimg.com/474x/56/ce/5c/56ce5cf1623e3ee5d53ca85d156fcc98.jpg",
    grade: "쉐프",
    userId: 9899,
    // pageCnt: 6,
    isLike: true,
    likeNum: "12",
    foodImg:
      "https://i.pinimg.com/474x/74/9e/a1/749ea10e77c2f3d6608781d24ee4273f.jpg",
    createAt: "2022-09-22",
  };

  // 레시피 step 페이지
  // 사진, 내용
  // /api/post/{post_id}/{page} -> 해당 게시글의 page 들을 모두 리스트로
  const IMSIdataDetail = {
    imageUrl:
      "https://i.pinimg.com/474x/f2/00/6c/f2006c0d0ae59eb7dad6b356e73cfc8d.jpg",
    content:
      "깨끗하게 씻은 브로콜리를 잘게 다져 줍니다. 씹는 식감을 좋아하는 분들은 약간 덜 다져도 괜찮습니다!",
  };

  // console.log("IMSIdata main! > ", IMSIdata);
  // console.log("IMSIdataDetail main! > ", IMSIdataDetail);

  return (
    <SwiperContainer>
      <SwiperBox>
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
          className="mySwiper"
        >
          <SwiperSlide>
            <SwiperRecipeItem
              IMSIdata={IMSIdata}
              IMSIdataDetail={IMSIdataDetail}
              isFirstPage={true}
            />
          </SwiperSlide>
          <SwiperSlide>
            <SwiperRecipeItem
              IMSIdata={IMSIdata}
              IMSIdataDetail={IMSIdataDetail}
              isFirstPage={false}
            />
          </SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
        </Swiper>
      </SwiperBox>
      <PageNav> * * * * *</PageNav>
    </SwiperContainer>
  );
};

const SwiperContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
`;

const PageNav = styled.div`
  padding: 1rem 0;
`;

const SwiperBox = styled.div`
  .swiper {
    width: 300px;
    height: 520px;
    margin: auto;
  }

  .swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 18px;
    /* color: #fff; */
  }

  .swiper-slide {
    background-color: var(--color-white);
    box-shadow: 0px 0px 10px #dcdcdc;
  }
`;

export default SwiperRecipe;
