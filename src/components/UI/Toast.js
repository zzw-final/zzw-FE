import { useEffect } from "react";
import styled from "styled-components";

function Toast({ setToast }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setToast(false);
    }, 1500);
    return () => {
      clearTimeout(timer);
    };
  }, [setToast]);

  return (
    <Box>
      <p>🖇 클립보드에 복사되었습니다.</p>
    </Box>
  );
}

export default Toast;

const Box = styled.div`
  margin: -1.2rem 0px 0px 1.5rem;
  padding: 0.8rem 1.2rem;
  background-color: white;
  opacity: 90%;
  border-radius: 10px;
  box-shadow: 0 10px 10px rgb(0 0 0 / 10%);
  color: black;
  text-align: center;
  font-weight: var(--weight-semi-bold);
  position: fixed;
  z-index: 1;
`;
