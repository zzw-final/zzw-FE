import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styled from "styled-components";
import "swiper/css/bundle";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import { EffectCards } from "swiper";
import SwiperRecipeItem from "./SwiperRecipeItem";

const SwiperRecipe = ({ postDetail, likeToggle }) => {
  const contentList = postDetail.contentList;
  const contentPageCnt = contentList.length;
  const pageNav = new Array(contentPageCnt);

  // console.log("pageNav", pageNav);

  // console.log("contentList main! > ", contentList);
  // console.log("contentPageCnt main! > ", contentPageCnt);

  const getIdx = (idx) => {
    console.log("idx !!!! >", idx);
  };

  const swiperRef = useRef();

  console.log("swiperRef > ", swiperRef.current);

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
              postDetail={postDetail}
              contentList={contentList}
              isFirstPage={true}
              likeToggle={likeToggle}
            />
          </SwiperSlide>
          {contentList.map((content, idx) => (
            <SwiperSlide
              key={idx}
              onChange={() => {
                getIdx(idx);
              }}
            >
              <SwiperRecipeItem
                postDetail={postDetail}
                contentList={content}
                isFirstPage={false}
                key={idx}
              />
              {/* <IdxFloat>{idx + 1}</IdxFloat> */}
            </SwiperSlide>
          ))}
        </Swiper>
      </SwiperBox>
      <PageNav>
        {pageNav.fill("*").map((item, idx) => (
          <Page key={idx}>{item}</Page>
        ))}
      </PageNav>
    </SwiperContainer>
  );
};

const SwiperContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 2rem 0;
`;

const PageNav = styled.div`
  padding: 1rem 0;
  display: flex;
`;

// const IdxFloat = styled.div`
//   position: absolute;
//   bottom: 10px;
// `;

const Page = styled.div``;

const SwiperBox = styled.div`
  .swiper {
    width: 280px;
    height: 500px;
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
