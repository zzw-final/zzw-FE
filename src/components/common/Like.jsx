import React from "react";
import styled from "styled-components";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const Like = ({ isLike, btnClick }) => {
  return (
    <LikeContainer onClick={btnClick}>
      {isLike ? (
        <FavoriteIcon fontSize="small" />
      ) : (
        <FavoriteBorderIcon fontSize="small" />
      )}
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
