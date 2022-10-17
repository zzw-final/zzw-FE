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
      <p>{text}</p>
    </Box>
  );
}

export default Toast;

const Box = styled.div`
  margin: ${({ margin }) => margin || "-4.3rem 0 2rem 6.5rem"};
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  position: ${({ position }) => position || "fixed"};
  padding: 1rem 1.5rem;
  background-color: white;
  opacity: 90%;
  border-radius: 10px;
  box-shadow: 0 10px 10px rgb(0 0 0 / 10%);
  color: black;
  text-align: center;
  font-weight: var(--weight-semi-bold);
  z-index: 1;
`;
