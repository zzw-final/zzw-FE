import { useEffect } from "react";
import styled from "styled-components";

function Toast({ setToast, text, ...props }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setToast(false);
    }, 1800);
    return () => {
      clearTimeout(timer);
    };
  }, [setToast]);

  return (
    <Box {...props}>
      <img
        src="https://zzwimage.s3.ap-northeast-2.amazonaws.com/profile/noneback/10.png"
        alt="고굼쓰"
      />
      <p>{text}</p>
    </Box>
  );
}

export default Toast;

const Box = styled.div`
  margin: ${({ margin }) => margin || "auto"};
  top: ${({ top }) => top || "17%"};
  left: ${({ left }) => left || "10%"};
  position: ${({ position }) => position || "absolute"};
  padding: 2rem 1.5rem;
  background-color: var(--color-main-light-orange);
  border-radius: 10px;
  box-shadow: 0px 10px 10px rgb(0 0 0 / 10%);
  color: black;
  text-align: center;
  font-size: var(--font-regular);
  font-weight: var(--weight-semi-bold);
  z-index: 10;
  width: 80%;

  img {
    width: 125px;
    height: 125px;
    padding: 0.5rem;
  }

  p {
    background-color: white;
    border-radius: 10px;
    padding: 0.5rem 0.5rem;
  }
`;
