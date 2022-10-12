import { useEffect, useRef, useState } from "react";
import * as StompJs from "@stomp/stompjs";
import { getCookie } from "../../util/cookie";
import useInput from "../../hooks/useInput";

function Chat() {
  const client = useRef({});
  const [msg, msgHandler] = useInput();

  useEffect(() => {
    connect();
    return disconnect();
  }, []);

  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL: `wss://${process.env.REACT_APP_CHAT_API}/zzw`,
      connectHeaders: {
        Authorization: getCookie("accessToken").split(" ")[1],
        oauth: getCookie("loginOauth"),
      },
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 50000,
      onConnect: (res) => {
        console.log("onConnect ->", res);
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
    client.current.subscribe(`/sub/chat/room/1`, (res) => {
      console.log("sub body ->", res.body);
    });
  };

  const publish = (msg) => {
    console.log("메시지 ->", msg);
    client.current.publish({
      destination: "/pub/chat/message",
      body: JSON.stringify({ roomId: 1, message: msg }),
      headers: {
        Authorization: getCookie("accessToken").split(" ")[1],
        oauth: getCookie("loginOauth"),
      },
    });
  };

  const unSubscribe = () => {
    client.current.unsubscribe();
  };

  return (
    <>
      <input onChange={msgHandler}></input>
      <button onClick={() => publish(msg)}>Publish</button>
    </>
  );
}

export default Chat;
