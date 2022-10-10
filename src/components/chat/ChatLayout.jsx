import React from "react";
import styled from "styled-components";

function ChatLayout({ publish, msg, msgHandler, children }) {
  return (
    <Container>
      <Header>
        <p>↩︎</p>
        <div>
          냉털초보<span>사이트의 개발자</span>
        </div>
      </Header>
      {children}
      <Label>
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
  margin: 0 auto 10px auto;

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
  position: relative;
  display: flex;
  width: 100%;
  position: fixed;
  bottom: 0;
  margin: 5px 0 10px 9px;

  input {
    outline: none;
    width: 95%;
    height: 2rem;
    padding: 1rem;
    border: 1px solid var(--color-light-orange);
    border-radius: 15px;
    background-color: var(--color-white-orange);
  }
  div {
    position: absolute;
    font-size: var(--font-regular);
    color: var(--color-dark-orange);
    top: 6px;
    right: 27px;
  }
`;
