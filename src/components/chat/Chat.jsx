import { useEffect, useRef, useState, useCallback } from "react";
import * as StompJs from "@stomp/stompjs";
import { getCookie } from "../../util/cookie";
import useInput from "../../hooks/useInput";

function Chat() {
  const client = useRef({});
  const [msg, msgHandler] = useInput();
  const [chat, setChat] = useState("");

  useEffect(() => {
    connect();
    return () => disconnect();
  }, []);

  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL: `wss://${process.env.REACT_APP_CHAT_API}/stomp/chat`,
      connectHeaders: {
        Authorization: getCookie("accessToken"),
        oauth: getCookie("loginOauth"),
      },
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 90000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: (res) => {
        console.log("onConnect 진입", res);
        subscribe();
      },
      onStompError: (frame) => {
        console.log("onStompError 진입", frame);
      },
    });
    client.current.activate();
  };

  const disconnect = () => {
    client.current.deactivate();
  };

  const subscribe = () => {
    client.current.subscribe(`/sub/chat`, (response) => {
      console.log(response);
    });
  };

  const publish = (msg) => {
    console.log("메시지", msg);
    client.current.publish({
      destination: "/pub/chat",
      body: JSON.stringify(msg),
    });
  };

  const unSubscribe = () => {
    client.current.unsubscribe();
  };

  console.log(msg, "메시지");

  return (
    <>
      <input onChange={msgHandler}></input>
      <button onClick={() => publish(msg)}>Publish</button>
    </>
  );
}

export default Chat;
