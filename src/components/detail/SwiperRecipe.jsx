import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styled from "styled-components";
import "swiper/css/bundle";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import { EffectCards } from "swiper";
import SwiperRecipeItem from "./SwiperRecipeItem";
import SwiperRecipeItemFirstPage from "./SwiperRecipeItemFirstPage";

const SwiperRecipe = ({
  postDetail,
  likeToggle,
  isEditMode,
  imgUpload,
  editedValues,
  setEditedValues,
  editForm,
}) => {
  const contentList = postDetail.contentList;

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
            <SwiperRecipeItemFirstPage
              postDetail={postDetail}
              likeToggle={likeToggle}
              isEditMode={isEditMode}
              imgUpload={imgUpload}
              editForm={editForm}
            />
          </SwiperSlide>
          {contentList.map((content, idx) => (
            <SwiperSlide key={idx}>
              <SwiperRecipeItem
                key={idx}
                idx={idx}
                contentList={content}
                isEditMode={isEditMode}
                imgUpload={imgUpload}
                editedValues={editedValues}
                setEditedValues={setEditedValues}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </SwiperBox>
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

const SwiperBox = styled.div`
  .swiper {
    width: 320px;
    height: 540px;
    margin: auto;
  }

  .swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 18px;
  }

  .swiper-slide {
    background-color: var(--color-white);
    box-shadow: 0px 0px 10px #dcdcdc;
  }
`;

export default SwiperRecipe;