import styled, { css } from "styled-components";
import React from "react";

const Button = ({ children, ...props }) => {
  return <MnBtn {...props}>{children}</MnBtn>;
};

export default Button;

const MnBtn = styled.button`
  color: ${({ Color }) => Color || "black"};
  background-color: ${({ backgroundColor }) => backgroundColor || "transparent"};
  height: 2rem;

  ${({ name }) => {
    switch (name) {
      case "MyToggleBtn":
        return css`
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2.5px solid var(--color-light-white);
          border-radius: 20px;
          padding: 0px 0.6rem;
          font-weight: var(--weight-semi-bold);
          font-size: var(--font-midium);
          cursor: pointer;

          ${({ myVisible }) =>
            myVisible &&
            css`
              background-color: var(--color-orange);
              font-weight: var(--weight-bolder);
              color: var(--color-white);
              border: 2.5px solid transparent;
              outline: none;
            `}

          ${({ likeVisible }) =>
            likeVisible &&
            css`
              background-color: var(--color-pink);
              font-weight: var(--weight-bolder);
              color: var(--color-white);
              border: 2.5px solid transparent;
              outline: none;
            `}
        `;

      case "followPageBtn":
        return css`
          margin: 1rem auto;
          background-color: transparent;
          border: 3px solid transparent;
          font-size: var(--font-regular);
          font-weight: var(--weight-semi-bold);
          color: var(--color-grey);
          padding: 0rem 0.7rem;

          ${({ followVisible }) =>
            followVisible &&
            css`
              color: black;
              font-weight: var(--weight-bold);
              border-bottom: 1.5px solid gray;
            `}

          ${({ followerVisible }) =>
            followerVisible &&
            css`
              color: black;
              border-bottom: 1.5px solid gray;
              font-weight: var(--weight-bold);
            `}
        `;

      case "ProfileBtn":
        return css`
          width: ${({ width }) => width || "100%"};
          height: ${({ height }) => height || "1.7rem"};
          background-color: var(--color-dark-white);
          border: none;
          border-radius: 5px;
          color: var(--color-white);
          font-size: var(--font-regular);
          font-weight: var(--weight-bold);
          ${({ isFollow }) =>
            !isFollow &&
            css`
              background-color: var(--color-sky);
              color: white;
              font-weight: var(--weight-bolder);
            `}
        `;

      case "FollowBtn":
        return css`
          height: 1.7rem;
          padding: 1rem 1rem;
          display: flex;
          align-items: center;
          background-color: var(--color-light-white);
          border: none;
          border-radius: 5px;
          font-size: var(--font-small);
          font-weight: var(--weight-semi-bold);

          ${({ isFollow }) =>
            !isFollow &&
            css`
              background-color: var(--color-sky);
              color: white;
              font-weight: var(--weight-bolder);
            `}
        `;

      case "EmptyBtn":
        return css`
          width: 9rem;
          height: 2rem;
          font-size: 15px;
          color: white;
          background-color: var(--color-dark-white);
          font-weight: var(--weight-bold);
          border-radius: 5px;
          border: none;
        `;

      default:
        return css`
          border: 3px solid white;
        `;
    }
  }}
`;
