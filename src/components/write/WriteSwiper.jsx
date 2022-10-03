import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styled from "styled-components";
import "swiper/css/bundle";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import { EffectCards } from "swiper";
import WriteTitle from "./WriteTitle";

function WriteSwiper(
  titleRef,
  foodnameRef,
  ingredientRef,
  timeRef,
  content,
  setImageURL
  // imageURL,
  // imgUpload
  // setIngredient,
) {
  const [slide, setSlide] = useState([]);

  const makeSlide = () => {
    setSlide(slide.concat(<SwiperSlide></SwiperSlide>));
  };
  return (
    <SwiperContainer>
      <SwiperBox>
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
          className="mySwiper"
        >
          <WriteTitle
          // titleRef={titleRef}
          // foodnameRef={foodnameRef}
          // ingredientRef={ingredientRef}
          // timeRef={timeRef}
          // content={content}
          // setImageURL={setImageURL}
          // imageURL={imageURL}
          // imgUpload={imgUpload}
          />
          {slide}
          <SwiperSlide>
            <button onClick={makeSlide}> + </button>
          </SwiperSlide>
        </Swiper>
      </SwiperBox>
    </SwiperContainer>
  );
}

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

export default WriteSwiper;
