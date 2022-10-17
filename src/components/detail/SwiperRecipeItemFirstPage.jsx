import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import Like from "../common/Like";
import { useState } from "react";
import { dateFormat } from "../../util/dateFormat";
import { useEffect } from "react";
import imageCompression from "browser-image-compression";
import { likePost } from "../../api/writepage";
import { useMutation, useQuery, useQueryClient } from "react-query";

const SwiperRecipeItemFirstPage = ({
  postDetail,
  isEditMode,
  imgUpload,
  editForm,
}) => {
  const {
    postId,
    title,
    nickname,
    profile,
    grade,
    authorId,
    isLike,
    likeNum,
    foodImg,
    createAt,
    time,
  } = postDetail;

  const [likeToggleBtn, setLikeToggleBtn] = useState(isLike);
  // const [viewLikeNum, setViewLikeNum] = useState(likeNum);

  const [cookies] = useCookies(["loginNickname"]);
  const navigate = useNavigate();

  const [imgFoodUrlEdited, setImgFoodUrlEdited] = useState(foodImg);
  const loginNickname = cookies.loginNickname;

  const userPage = () => {
    if (+cookies.loginUserId === authorId) navigate(`/mypage`);
    else navigate(`/mypage/${authorId}`);
  };
  //좋아요 수정해보자
  const { id } = useParams();
  const queryClient = useQueryClient();

  const likeMutate = useMutation((postId) => likePost(postId), {
    onMutate: async () => {
      await queryClient.cancelQueries(["detail", id]); //업데이트 안될거임, 존재하는 query취소
      const data = queryClient.getQueryData(["detail", id]).data?.data?.isLike; //현재데이터 가져오기
      console.log("prevData->Like", data);
      queryClient.setQueryData(["detail", id], (data) => {
        return {
          ...data,
          isLike: !data,
        };
      });
    },
    onSuccess: (postId) => {
      queryClient.invalidateQueries("detail", id);
      console.log("좋아요성공?", postId);
    },
  });
  const like = () => {
    if (loginNickname === undefined) {
      alert("로그인 유저만 사용 가능한 기능입니다.");
      return;
    }

    const likeResult = likeMutate.mutate(postId);
    console.log("디테일페이지에서 가져온값", likeResult?.data?.data);
    if (likeResult?.data?.data == "post like success") {
      // setViewLikeNum(viewLikeNum + 1);
      setLikeToggleBtn(!isLike);
    } else {
      // setViewLikeNum(viewLikeNum - 1);
      setLikeToggleBtn(!isLike);
    }
  };

  useEffect(() => {
    editForm("imageUrl", imgFoodUrlEdited);
  }, [imgFoodUrlEdited]);

  const getImgUpload = async (e) => {
    const [file] = e.target.files;
    const newFile = await imageCompression(file, {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
    });
    const resizingFile = new File([newFile], file.name, { type: file.type });
    const result = await imgUpload(resizingFile);
    setImgFoodUrlEdited(result.data.data.imageUrl);
  };

  console.log(postDetail);
  return (
    <>
      <ItemContainer display={!isEditMode ? "Flex" : "none"}>
        <ItemImg src={foodImg} alt="Recipe" />
        <TimeBox>
          <Time>⏱ {postDetail?.time} min</Time>
        </TimeBox>
        <LikeBox>
          <Like isLike={likeToggleBtn} btnClick={like} /> {postDetail?.likeNum}
        </LikeBox>
        <ItemBox>
          <ItemInfo>
            <Avatar
              alt="user_img"
              src={profile}
              sx={{ width: 40, height: 40, mr: 1 }}
              onClick={userPage}
            />
            <NinknameCreatedAt>
              <Nickname onClick={userPage}>
                {nickname}/{grade}
              </Nickname>
              <FollowBtn>팔로우</FollowBtn>
              {/* <CreatedAt>{dateFormat(createAt)}</CreatedAt> */}
            </NinknameCreatedAt>
          </ItemInfo>
          <ItemTitle>{title}</ItemTitle>
        </ItemBox>
      </ItemContainer>
      <ItemContainer display={!isEditMode ? "none" : "Flex"}>
        <ItemImg src={imgFoodUrlEdited} alt="Recipe" />
        <ItemImgEdit type="file" accept="image/*" onChange={getImgUpload} />
        <ItemBox>
          <ItemInfo>
            <Avatar
              alt="user_img"
              src={profile}
              sx={{ width: 40, height: 40, mr: 1 }}
              onClick={userPage}
            />
            <NinknameCreatedAt>
              <Nickname onClick={userPage}>
                {grade}/{nickname}
              </Nickname>

              {/* <CreatedAt>{dateFormat(createAt)}</CreatedAt> */}
            </NinknameCreatedAt>
          </ItemInfo>
          <ItemTitleEdit
            defaultValue={title}
            onBlur={(e) => {
              editForm("title", e.target.value);
            }}
          ></ItemTitleEdit>
        </ItemBox>
      </ItemContainer>
    </>
  );
};

const ItemContainer = styled.div`
  display: ${({ display }) => display};
  flex-direction: column;
  color: var(--color-black);
  height: 100%;
  width: 100%;
  position: relative;
`;

const TimeBox = styled.div`
  display: flex;
  background-color: var(--color-white);
  color: var(--color-grey);
  position: absolute;
  top: 3%;
  left: 5%;
  border-radius: 15px;
  padding: 0.3rem;
  width: 22%;
`;

const Time = styled.div`
  font-size: var(--font-regular);
  margin-left: 0.3rem;
  font-weight: var(--weight-bold);
  /* position: absolute;
  top: 3%;
  left: 5%; */
`;

const ItemImg = styled.img`
  width: 95%;
  height: 70%;
  border-radius: 18px;
  padding: 0.2rem;
  margin: 0 auto 1rem auto;
`;

const ItemImgEdit = styled.input`
  position: absolute;
  top: 300px;
  left: 16px;
`;

const LikeBox = styled.div`
  display: flex;
  background-color: var(--color-white);
  color: var(--color-grey);
  align-items: center;
  justify-content: center;
  /* box-shadow: 0px 0px 5px #dcdcdc; */
  border-radius: 15px;
  padding: 0.3rem;
  width: 15%;
  position: absolute;
  right: 6%;
  top: 61%;
  font-size: var(--font-regular);
`;

const ItemBox = styled.div`
  padding: 0 1rem;
  /* background-color: lavender; */
`;

const ItemInfo = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 1rem;
  margin-left: 5px;
`;

const NinknameCreatedAt = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Nickname = styled.div`
  font-size: var(--font-semi-small);
  color: var(--color-black);
  margin-top: 3px;
`;

const FollowBtn = styled.button`
  width: 15vw;
  height: 3.5vh;
  border: 0;
  border-radius: 8px;
  background-color: #ff7a00;
  color: white;
  margin: 0 10px 3px 0;
  margin-right: 10px;
`;

// const CreatedAt = styled.div`
//   font-size: var(--font-micro);
//   color: var(--color-grey);
// `;

const ItemTitle = styled.div`
  font-size: var(--font-semi-small);
  margin-left: 15px;
`;

const ItemTitleEdit = styled.input`
  width: 100%;
`;

export default SwiperRecipeItemFirstPage;
