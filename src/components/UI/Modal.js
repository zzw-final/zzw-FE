import { useEffect } from "react";
import styled from "styled-components";

function Modal({ children, setModalIsOpen }) {
  useEffect(() => {
    document.body.style = `overflow: hidden`;
    return () => (document.body.style = `overflow: auto`);
  }, []);

  return (
    <ModalBack onClick={() => setModalIsOpen(false)}>
      <ModalBox onClick={(e) => e.stopPropagation()}>{children}</ModalBox>
    </ModalBack>
  );
}

export default Modal;

let ModalBack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

let ModalBox = styled.div`
  border-radius: 10px;
  background-color: white;
  width: 22rem;
  height: 38.5rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 15px 10px;
  z-index: 1;
`;
