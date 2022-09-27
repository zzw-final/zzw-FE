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
  background-color: var(--color-white);
  color: var(--color-dark-orange);
  border-radius: 30%;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 5px #dcdcdc;
`;

export default Like;
