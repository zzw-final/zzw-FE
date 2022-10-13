import { useEffect, useRef, useState } from "react";
import * as StompJs from "@stomp/stompjs";
import { getCookie } from "../util/cookie";
import useInput from "../hooks/useInput";
import ChatLayout from "../components/chat/ChatLayout";
import { useNavigate, useParams } from "react-router-dom";
import SendMsg from "../components/chat/SendMsg";
import GetMsg from "../components/chat/GetMsg";
import { instance } from "../api/request";
import { useLocation } from "react-router-dom";

function ChatPage() {
  const client = useRef({});
  const { roomId } = useParams();
  const [msg, msgHandler, setMsg] = useInput();
  const [messages, setMessages] = useState([{}]);
  const { state: location } = useLocation();

  useEffect(() => {
    connect();
    return () => disconnect();
  }, []);

  //기존 메세지 내용 불러오기
  useEffect(() => {
    const getChat = async () => {
      const chatData = await instance.get(`/api/chat/message/${roomId}`);
      console.log("기존메세지", chatData.data.data);
      setMessages(chatData.data.data);
    };
    getChat();
  }, []);

  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL: `wss://${process.env.REACT_APP_CHAT_API}/zzw`,
      connectHeaders: {
        Authorization: getCookie("accessToken"),
        oauth: getCookie("loginOauth"),
      },
      reconnectDelay: 100,
      onConnect: () => {
        subscribe();
      },
    });
    client.current.activate();
  };
  //disconnect시 메세지 어디까지 확인했는지 체크해주는 put 요청
  const disconnect = () => {
    const back = async () => {
      const newdata = {
        roomId: Number(roomId),
        // messageId: messages[messages.length - 1].messageId,
        userId: Number(getCookie("loginUserId")),
      };
      console.log(newdata);
      await instance.put("/api/chat/newmessage", newdata);
    };
    back();
    client.current.deactivate();
  };

  const subscribe = () => {
    client.current.subscribe(`/sub/chat/room/${roomId}`, (res) => {
      const body = JSON.parse(res.body);
      // console.log("sub body ->", JSON.parse(res.body));
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

  // const unSubscribe = () => {
  //   client.current.unsubscribe();
  // };

  //보내는사람 받는사람->닉네임으로 비교
  const loginNickname = getCookie("loginNickname");

  //스크롤 하단 고정
  const scrollRef = useRef(null);
  //랜더링시 스크롤 고정
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  //새로운 메세지 오면 하단 고정
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <ChatLayout
      msg={msg}
      setMsg={setMsg}
      publish={publish}
      msgHandler={msgHandler}
      location={location}
    >
      <div style={{ margin: "50px 0px 50px 0px", width: "90%", height: "90%" }}>
        {messages &&
          messages.map((mag, idx) =>
            loginNickname === messages[idx].sender ? (
              <SendMsg
                messages={messages}
                mag={mag}
                idx={idx}
                scrollRef={scrollRef}
              />
            ) : (
              <GetMsg
                location={location}
                messages={messages}
                mag={mag}
                idx={idx}
                scrollRef={scrollRef}
              />
            )
          )}
      </div>
    </ChatLayout>
  );
}

export default ChatPage;
