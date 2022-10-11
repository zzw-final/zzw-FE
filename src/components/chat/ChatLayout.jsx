import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function ChatLayout({ publish, msg, msgHandler, setMsg, location, children }) {
  const navigate = useNavigate();

  const pub = () => {
    if (msg !== "") {
      publish(msg);
      setMsg("");
    }
  };

  const onEnterPress = (e) => {
    if (msg !== "" && e.key === "Enter") {
      pub();
      setMsg("");
    }
  };

  return (
    <Container>
      <Header>
        <p onClick={() => navigate("/chatlist")}>↩︎</p>
        <div>
          {location.nickname}
          <span>{location.grade}</span>
        </div>
      </Header>
      {children}

      <Label style={{ position: "fixed" }}>
        <input onChange={msgHandler} />
        <div onClick={() => publish(msg)}>전송</div>
      </Label>
    </Container>
  );
}

export default ChatLayout;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  width: 90%;
  height: 50px;
  display: flex;
  border-bottom: 1px solid var(--color-light-orange);
  align-items: center;
  margin: auto auto 10px 10px;
  background-color: white;
  position: fixed;
  p {
    font-size: var(--font-regular);
    font-weight: var(--weight-semi-bold);
  }
  div {
    margin: auto;
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

  input {
    margin: 10px auto 10px auto;
    outline: none;
    width: 95%;
    height: 2rem;
    padding: 0.7rem;
    border: 1px solid var(--color-light-orange);
    font-size: var(--font-semi-small);
    border-radius: 15px;
    background-color: var(--color-white-orange);
  }
  div {
    position: absolute;
    font-size: var(--font-regular);
    color: var(--color-dark-orange);
    top: 16px;
    right: 25px;
  }
`;
