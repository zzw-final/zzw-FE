import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TextAreaAutoResize from "react-textarea-autosize";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

function ChatLayout({ publish, msg, msgHandler, setMsg, location, children, out }) {
  const navigate = useNavigate();
  const pub = () => {
    if (msg.length < 256) {
      if (msg.trim() !== "") {
        publish(msg);
        setMsg("");
      }
    } else {
      alert("최대 255자 까지 입력 가능합니다 !");
    }
  };

  const onEnterPress = (e) => {
    if (msg.trim() !== "" && e.key === "Enter") {
      e.preventDefault();
      pub();
      setMsg("");
    }
  };

  return (
    <Container>
      <Header>
        <KeyboardBackspaceIcon onClick={() => navigate("/chatlist")} />
        <div>
          {location?.nickname}
          <span>{location?.grade}</span>
        </div>
        <DeleteIcon onClick={out} sx={{ outline: "none" }} />
      </Header>
      {children}
      <Label style={{ position: "fixed" }}>
        <TextAreaAutoResize value={msg} onKeyPress={onEnterPress} onChange={msgHandler} />
        <div onClick={pub}>전송</div>
      </Label>
    </Container>
  );
}

export default ChatLayout;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
`;

const Header = styled.div`
  width: 95%;
  height: 50px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-light-orange);
  align-items: center;
  margin: auto auto 10px 10px;
  background-color: white;
  position: fixed;

  div {
    margin: auto 25px auto 20px;
    font-size: var(--font-medium-large);
    font-weight: var(--weight-semi-bold);
  }
  span {
    margin-left: 15px;
    font-size: var(--font-regular);
    font-weight: var(--weight-regular);
  }
`;

const Label = styled.label`
  /* position: relative; */

  display: flex;
  width: 100%;
  position: fixed;
  bottom: 0;

  textarea {
    margin: 10px auto 10px auto;
    width: 95%;
    height: 2rem;
    max-height: 4rem;
    padding: 0.4rem 3.5rem 0.4rem 1rem;
    border: 1px solid var(--color-light-orange);
    font-size: var(--font-semi-small);
    border-radius: 15px;
    background-color: var(--color-white-orange);
    outline: none;
    resize: none;
    overflow: hidden;
    caret-color: var(--color-orange);
  }
  div {
    position: absolute;
    font-size: var(--font-regular);
    color: var(--color-dark-orange);
    top: 16px;
    right: 25px;
  }
`;
