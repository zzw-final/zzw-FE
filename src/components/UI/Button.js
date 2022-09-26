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
        `;

      case "ProfileBtn":
        return css`
          width: 100%;
          height: 1.7rem;
          background-color: var(--color-blue);
          border: none;
          border-radius: 5px;
          color: var(--color-white);
          font-size: var(--font-regular);
          font-weight: var(--weight-bold);
        `;

      case "FollowBtn":
        return css`
          height: 1.7rem;
          padding: 1rem 0.7rem;
          display: flex;
          align-items: center;
          background-color: var(--color-blue);
          border: none;
          border-radius: 20px;
          color: var(--color-white);
          font-size: var(--font-regular);
          font-weight: var(--weight-bold);
        `;

      default:
        return css`
          border: 3px solid white;
        `;
    }
  }}
`;
