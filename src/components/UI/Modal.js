import { useEffect } from "react";
import styled from "styled-components";

function Modal({ children, setModalIsOpen, ...props }) {
  useEffect(() => {
    document.body.style = `overflow: hidden`;
    return () => (document.body.style = `overflow: auto`);
  }, []);

  return (
    <ModalBack onClick={() => setModalIsOpen(false)}>
      <ModalBox {...props} onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalBox>
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
  background-color: ${({ backgroundColor }) => backgroundColor || "var(--color-white)"};
  width: 22rem;
  min-height: 35rem;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: ${({ padding }) => padding || "15px 10px"};
  z-index: 1;
  overflow-y: scroll;
  bottom: 1px;
`;
