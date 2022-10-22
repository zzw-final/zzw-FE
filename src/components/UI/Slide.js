import { useEffect } from "react";
import styled from "styled-components";

function Slide({ children, setSlideIsOpen }) {
  useEffect(() => {
    document.body.style = `overflow: hidden`;
    return () => (document.body.style = `overflow: auto`);
  }, []);

  return (
    <SlideBack onClick={() => setSlideIsOpen(false)}>
      <SlideBox onClick={(e) => e.stopPropagation()}>{children}</SlideBox>
    </SlideBack>
  );
}

export default Slide;

const SlideBack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  /* background-color: rgba(0, 0, 0, 0.5); */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const SlideBox = styled.div`
  background-color: var(--color-white);
  border-radius: 1.5rem 1.5rem 0 0;
  box-shadow: 0 0 10px rgb(0 0 0 / 30%);
  text-align: center;
  width: 100%;
  height: auto;
  max-height: 70%;
  position: absolute;
  bottom: 60px;
  padding: 1rem 2rem 5rem 2rem;
  transition: all 600ms cubic-bezier(0.86, 0, 0.07, 1);
  z-index: 2;
  overflow: auto;
  animation-name: slideMotion;
  animation-duration: 1s;

  @keyframes slideMotion {
    from {
      bottom: 0px;
    }
    to {
      bottom: 60px;
    }
  }
`;
