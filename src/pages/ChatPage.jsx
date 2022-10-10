import { useEffect, useRef, useState } from "react";
import * as StompJs from "@stomp/stompjs";
import { getCookie } from "../util/cookie";
import useInput from "../hooks/useInput";
import ChatLayout from "../components/chat/ChatLayout";
import { useParams } from "react-router-dom";

function ChatPage() {
  const client = useRef({});
  const { roomId } = useParams();
  const [msg, msgHandler, setMsg] = useInput("");

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
      console.log("sub body ->", JSON.parse(res.body));
    });
  };

  const publish = (msg) => {
    console.log("퍼블리시 ->", msg);
    if (msg !== "") {
      client.current.publish({
        destination: "/pub/chat/message",
        body: JSON.stringify({ roomId: +roomId, message: msg }),
        headers: {
          Authorization: getCookie("accessToken"),
          oauth: getCookie("loginOauth"),
        },
      });
    }
  };

  const unSubscribe = () => {
    client.current.unsubscribe();
  };

  return (
    <ChatLayout msg={msg} setMsg={setMsg} publish={publish} msgHandler={msgHandler}>
      <div>여기에 수진님이 메시지 넣으시면 되는 부분 ~</div>
    </ChatLayout>
  );
}

export default ChatPage;
