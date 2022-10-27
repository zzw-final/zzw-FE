import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styled from "styled-components";
import "swiper/css/bundle";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import SwiperRecipeItem from "./SwiperRecipeItem";
import SwiperRecipeItemFirstPage from "./SwiperRecipeItemFirstPage";
import { DetailContext } from "../../context/DetailContext";

const SwiperRecipe = ({ isEditMode, setIsEditMode, onEditPage }) => {
  const data = useContext(DetailContext);
  const { postDetail } = data;

  const contentList = postDetail.contentList;

  return (
    <SwiperContainer>
      <SwiperBox>
        <Swiper
          effect={"cards"}
          grabCursor={true}
          pagination={true}
          modules={[Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <SwiperRecipeItemFirstPage
              isEditMode={isEditMode}
              setIsEditMode={setIsEditMode}
              onEditPage={onEditPage}
            />
          </SwiperSlide>
          {contentList.map((content, idx) => (
            <SwiperSlide key={idx}>
              <SwiperRecipeItem
                key={idx}
                idx={idx}
                contentList={content}
                isEditMode={isEditMode}
                setIsEditMode={setIsEditMode}
                onEditPage={onEditPage}
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
`;

export default SwiperRecipe;
