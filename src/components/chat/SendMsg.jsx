import React from "react";
import styled from "styled-components";
import { dateFormat } from "../../util/dateFormat";

function sendMsg({ messages, msg, idx, scrollRef }) {
  const date = dateFormat(messages[idx].sendTime);

  return (
    <div>
      <SendChatDiv key={idx}>
        <MsgDiv ref={scrollRef}>
          <DateDiv>{date}</DateDiv>
          <Content>{messages[idx].message}</Content>
        </MsgDiv>
      </SendChatDiv>
    </div>
  );
}

export default sendMsg;

const SendChatDiv = styled.div`
  float: right;
  width: 100%;
`;

const MsgDiv = styled.div`
  display: flex;
  float: right;
  width: 90%;
  padding: 10px;
  margin-right: -20px;
`;

const DateDiv = styled.p`
  font-size: var(--font-micro);
  width: auto;
  margin: auto 1px 10px auto;
  color: var(--color-grey);
`;

const Content = styled.div`
  background-color: var(--color-orange);
  width: fit-content;
  max-width: 50vw;
  height: auto;
  overflow: auto;
  padding: 7px;
  margin: 5px;
  border-radius: 7px;

  float: right;
`;
