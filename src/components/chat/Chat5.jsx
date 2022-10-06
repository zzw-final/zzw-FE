import React, { useRef, useState, useEffect } from "react";
import * as StompJs from "@stomp/stompjs";

function CreateReadChat() {
  const [chatList, setChatList] = useState([]);
  const [chat, setChat] = useState("");
  const client = useRef({});

  const subscribe = () => {
    client.current.subscribe(`/sub/chat/room`, (body) => {
      console.log("뻘메시지", body);
      const jsonBody = JSON.parse(body.body);
      setChatList((props) => [...props, jsonBody]);
    });
  };

  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL: `wss://jeeyeon.shop/stomp/chat`,
      debug: (str) => console.log(str),
      onConnect: (res) => {
        console.log("onConnect 들어온다", res);
        subscribe();
      },
      onStompError: () => {
        console.log("Error 들어온다");
      },
    });
    client.current.activate();
  };

  const publish = (ch) => {
    if (!client.current.connected) return;
    client.current.publish({
      destination: "/pub/chat/enter",
      body: JSON.stringify({
        type: "TALK",
        sendTime: Date.now(),
        imageUrl: "",
        nickName: "Me",
        userId: "",
        message: ch,
      }),
    });
    console.log("퍼블리시 되었음");
    setChat("");
  };

  const disconnect = () => {
    client.current.deactivate();
  };

  const handleChange = (event) => {
    // 채팅 입력 시 state에 값 설정
    setChat(event.target.value);
  };

  const handleSubmit = (event, ch) => {
    // 보내기 버튼 눌렀을 때 publish
    event.preventDefault();
    publish(ch);
  };

  useEffect(() => {
    connect();
    return () => disconnect();
  }, []);

  console.log("채팅", chat);

  return (
    <div>
      <div className="chat-list">
        {chatList.map((ch) => {
          return <div key={1}>{`${ch.type} : ${ch.nickName} : ${ch.message}`}</div>;
        })}
      </div>
      <form onSubmit={(event) => handleSubmit(event, chat)}>
        <div>
          <input type="text" name="chatInput" onChange={handleChange} value={chat} />
        </div>
        <input type="submit" value="의견 보내기" />
      </form>
    </div>
  );
}

export default CreateReadChat;
