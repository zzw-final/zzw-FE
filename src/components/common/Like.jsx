import React from "react";
import styled from "styled-components";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { likes } from "../../api/request";
import { useMutation, useQueryClient } from "react-query";
import { getCookie } from "../../util/cookie";

const Like = ({ isLike, postId }) => {
  const loginNickname = getCookie("loginNickname");
  const queryClient = useQueryClient();

  const likeMutate = useMutation((postId) => likes(postId), {
    onSuccess: (list, value) => {
      if (list.data.data.isGet) alert("🎉 새로운 칭호를 획득했습니다! 마이페이지에서 확인하세요.");
      queryClient.invalidateQueries(["detail", "" + value]);
      queryClient.invalidateQueries(["mainPage"]);
      queryClient.invalidateQueries(["follow"]);
      queryClient.invalidateQueries(["follower"]);
      queryClient.invalidateQueries(["userpage", "profile"]);
      queryClient.invalidateQueries(["mypage", "profile"]);
      queryClient.invalidateQueries(["mypage", "likeRecipes"]);
      return list;
    },
  });

  const like = async () => {
    if (loginNickname === undefined) return alert("로그인 유저만 사용 가능한 기능입니다.");
    likeMutate.mutate(postId);
  };

  return (
    <LikeContainer onClick={like}>
      {isLike ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
    </LikeContainer>
  );
};

const LikeContainer = styled.div`
  font-size: var(--font-micro);
  color: var(--color-main-dark-orange);
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Like;
