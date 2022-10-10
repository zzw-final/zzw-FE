import { useEffect, useRef, useState } from "react";
import * as StompJs from "@stomp/stompjs";
import { getCookie } from "../util/cookie";
import useInput from "../hooks/useInput";
import ChatLayout from "../components/chat/ChatLayout";
import { useParams } from "react-router-dom";
import SendMsg from "../components/chat/SendMsg";
import GetMsg from "../components/chat/GetMsg";

function ChatPage() {
  const client = useRef({});
  const { roomId } = useParams();
  const [msg, msgHandler] = useInput();
  const [messages, setMessages] = useState([
    {
      message: "",
      sender: "",
      sendTime: "",
    },
  ]);

  useEffect(() => {
    connect();
    return () => disconnect();
  }, []);

  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL: `wss://${process.env.REACT_APP_CHAT_API}/zzw`,
      connectHeaders: {
        Authorization: getCookie("accessToken"),
        oauth: getCookie("loginOauth"),
      },
      // debug: function (str) {
      //   console.log(str);
      // },
      reconnectDelay: 100,
      onConnect: (res) => {
        subscribe();
      },
      onStompError: (frame) => {
        console.log("onStompError ->", frame);
      },
    });
    client.current.activate();
  };

  const disconnect = () => {
    client.current.deactivate();
  };

  const subscribe = () => {
    client.current.subscribe(`/sub/chat/room/${roomId}`, (res) => {
      const body = JSON.parse(res.body);
      console.log("sub body ->", JSON.parse(res.body));
      setMessages((msg) => [
        ...msg,
        {
          message: body.message,
          sender: body.sender,
          sendTime: body.sendTime,
          profile: body.profile,
        },
      ]);
    });
  };

  const publish = (msg) => {
    console.log("퍼블리시 ->", msg);
    client.current.publish({
      destination: "/pub/chat/message",
      body: JSON.stringify({ roomId: +roomId, message: msg }),
      headers: {
        Authorization: getCookie("accessToken"),
        oauth: getCookie("loginOauth"),
      },
    });
  };

  const unSubscribe = () => {
    client.current.unsubscribe();
  };
  const time = messages.map((msg, idx) => messages[idx].sendTime);
  console.log("보내는시간", time);
  const time2 = time.sort(
    (a, b) => new DataTransfer(a.data) - new DataTransfer(b.data)
  );
  console.log("time2", time2);
  const loginNickname = getCookie("loginNickname");

  return (
    <ChatLayout msg={msg} publish={publish} msgHandler={msgHandler}>
      <div style={{ marginBottom: "50px" }}>
        {messages.map((mag, idx) =>
          loginNickname === messages[idx].sender ? (
            <SendMsg messages={messages} mag={mag} idx={idx} />
          ) : (
            <GetMsg messages={messages} mag={mag} idx={idx} />
          )
        )}
      </div>
    </ChatLayout>
  );
}

export default ChatPage;
