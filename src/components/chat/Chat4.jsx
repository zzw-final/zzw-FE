import { useRef, useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
import * as StompJs from "@stomp/stompjs";
import { ConstructionOutlined } from "@mui/icons-material";

export default function CreateReadChat() {
  const [chatList, setChatList] = useState([]);
  const [chat, setChat] = useState("");

  //   const { apply_id } = useParams();
  const client = useRef({});

  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL: `wss://jeeyeon.shop/stomp/chat`,
      debug: (str) => {
        console.log(str);
      },
      onConnect: () => {
        console.log("커넥트 성공, subscribe 함수 실행");
        subscribe();
      },
    });
    client.current.activate();
  };

  const publish = (chat) => {
    if (!client.current.connected) return;

    client.current.publish({
      destination: "/pub/chat/enter",
      body: JSON.stringify({
        // applyId: apply_id,
        chat: chat,
      }),
    });

    setChat("");
  };

  const subscribe = () => {
    client.current.subscribe("/sub/chat", (body) => {
      const json_body = JSON.parse(body.body);
      console.log(json_body);
      setChatList((_chat_list) => [..._chat_list, json_body]);
    });
  };

  const disconnect = () => {
    client.current.deactivate();
  };

  const handleChange = (event) => {
    // 채팅 입력 시 state에 값 설정
    setChat(event.target.value);
  };

  const handleSubmit = (event, chat) => {
    // 보내기 버튼 눌렀을 때 publish
    event.preventDefault();

    publish(chat);
  };

  useEffect(() => {
    connect();

    return () => disconnect();
  }, []);

  console.log(chat, "채팅");
  console.log(chatList, "채팅 리스트");

  return (
    <div>
      <div className={"chat-list"}>{chatList}</div>
      <form onSubmit={(event) => handleSubmit(event, chat)}>
        <div>
          <input type={"text"} name={"chatInput"} onChange={handleChange} value={chat} />
        </div>
        <input type={"submit"} value={"의견 보내기"} />
      </form>
    </div>
  );
}
