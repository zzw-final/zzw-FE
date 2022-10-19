import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styled from "styled-components";
import "swiper/css/bundle";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
// import { EffectCards } from "swiper";
import { Pagination } from "swiper";
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
  toggleTagList,
  setToggleTagList,
  openTagBox,
  onEditPage,
  onCancle,
  onSubmitHandler,
  onDelete,
  greyButton,
  followHandler,
}) => {
  const contentList = postDetail.contentList;

  return (
    <SwiperContainer>
      <SwiperBox>
        <Swiper
          effect={"cards"}
          grabCursor={true}
          pagination={true}
          modules={[Pagination]}
          // modules={[EffectCards]}
          className="mySwiper"
        >
          <SwiperSlide>
            <SwiperRecipeItemFirstPage
              postDetail={postDetail}
              likeToggle={likeToggle}
              isEditMode={isEditMode}
              imgUpload={imgUpload}
              editForm={editForm}
              toggleTagList={toggleTagList}
              setToggleTagList={setToggleTagList}
              openTagBox={openTagBox}
              onEditPage={onEditPage}
              onCancle={onCancle}
              onSubmitHandler={onSubmitHandler}
              onDelete={onDelete}
              greyButton={greyButton}
              followHandler={followHandler}
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
                postDetail={postDetail}
                onEditPage={onEditPage}
                onCancle={onCancle}
                onSubmitHandler={onSubmitHandler}
                onDelete={onDelete}
                greyButton={greyButton}
                followHandler={followHandler}
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
  margin: 1rem 0;
`;

const SwiperBox = styled.div`
  z-index: 0;

  .swiper {
    width: 400px;
    height: 600px;
    margin: auto;
    border: 0;
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
