import React, { useEffect, useRef, useState } from "react";
import * as StompJs from "@stomp/stompjs";
import { getCookie } from "../../util/cookie";

const ROOM_SEQ = 1;

const Chat3 = () => {
  const client = useRef({});
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    connect();

    return () => disconnect();
  }, []);

  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL: `wss://jeeyeon.shop/stomp/chat`,
      //   connectHeaders: {
      //     Authorization: getCookie("accessToken"),
      //     oauth: getCookie("loginOauth"),
      //   },
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log("연결되었나");
        subscribe();
      },
      onStompError: (frame) => {
        console.error(frame);
      },
    });

    client.current.activate();
  };

  const disconnect = () => {
    client.current.deactivate();
  };

  const subscribe = () => {
    client.current.subscribe(`/sub/chat/room`, ({ body }) => {
      console.log("찍히나", body);
      setChatMessages((chatMessages) => [...chatMessages, JSON.parse(body)]);
    });
  };

  console.log(chatMessages);
  const publish = (message) => {
    if (!client.current.connected) {
      return;
    }

    client.current.publish({
      destination: "/pub/chat/enter",
      body: JSON.stringify({ message }),
    });

    setMessage("");
  };

  return (
    <div>
      {chatMessages && chatMessages.length > 0 && (
        <ul>
          {chatMessages.map((_chatMessage, index) => (
            <li key={index}>{_chatMessage.message}</li>
          ))}
        </ul>
      )}
      <div>
        <input
          type={"text"}
          placeholder={"message"}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.which === 13 && publish(message)}
        />
        <button onClick={() => publish(message)}>send</button>
      </div>
    </div>
  );
};

export default Chat3;
