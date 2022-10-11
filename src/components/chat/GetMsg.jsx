import React from "react";
import styled from "styled-components";
import { dateFormat } from "../../util/dateFormat";

function GetMsg({ messages, msg, idx, scrollRef }) {
  const date = dateFormat(messages[idx].sendTime);
  return (
    <div>
      <GetMsgDiv key={idx}>
        <MsgDiv ref={scrollRef}>
          <ProFileimg alt="profile" src={messages[idx].profile} />
          <Content>{messages[idx].message}</Content>
          <DateDiv>{date}</DateDiv>
        </MsgDiv>
      </GetMsgDiv>
    </div>
  );
}

export default GetMsg;

const GetMsgDiv = styled.div`
  float: left;
  width: 100%;
  margin-left: 10px;
`;

const ProFileimg = styled.img`
  width: 10vw;
  border-radius: 20px;
  margin: auto 5px auto 1px;
`;
const MsgDiv = styled.div`
  display: flex;
  float: left;
  width: 90%;
  padding: 10px;
`;

const Content = styled.div`
  background-color: #eee;
  width: fit-content;
  max-width: 50vw;
  height: auto;
  overflow: auto;
  padding: 7px;
  margin: 5px;
  border-radius: 7px;
`;

const DateDiv = styled.p`
  font-size: var(--font-micro);
  width: auto;
  margin: auto auto 10px 1px;
  color: var(--color-grey);
`;
