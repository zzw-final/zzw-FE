import { useEffect, useRef, useState, useCallback } from "react";
import * as StompJs from "@stomp/stompjs";
import { getCookie } from "../../util/cookie";

function Chat() {
  useEffect(() => {
    connect();
    return () => disconnect();
  }, []);

  const client = useRef({});

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
      reconnectDelay: 600000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log("성공했다쉬먀");
      },
    });
    client.current.activate();
  };

  //   if (typeof WebSocket !== "function") {
  //     client.webSocketFactory = () => {
  //       return new SockJS(`ws://15.164.216.199/stomp/chat/ws`);
  //     };
  //   }

  // client.onConnect = function (frame) {
  //   console.log("소켓이 연결되었음");
  //   console.log(frame);
  //   // Do something, all subscribes must be done is this callback
  //   // This is needed because this will be executed after a (re)connect
  // };

  // client.onStompError = function (frame) {
  //   console.log("여기오나?");
  //   // Will be invoked in case of error encountered at Broker
  //   // Bad login/passcode typically will cause an error
  //   // Complaint brokers will set `message` header with a brief message. Body may contain details.
  //   // Compliant brokers will terminate the connection after any error
  //   console.log("Broker reported error: " + frame.headers["message"]);
  //   console.log("Additional details: " + frame.body);
  // };

  // client.activate();
  //   };

  const disconnect = () => {
    client.current.deactivate();
  };

  const subscribe = () => {
    client.current.subscribe(`주소`, ({ body }) => {});
  };

  const unSubscribe = () => {
    client.current.unsubscribe();
  };

  return <div>Chat</div>;
}

export default Chat;

// import React, { useEffect, useRef, useState } from "react";
// import * as StompJs from "@stomp/stompjs";
// import * as SockJS from "sockjs-client";

// const ROOM_SEQ = 1;

// const App = () => {
//   const client = useRef({});
//   const [chatMessages, setChatMessages] = useState([]);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     connect();

//     return () => disconnect();
//   }, []);

//   const connect = () => {
//     client.current = new StompJs.Client({
//       // brokerURL: "ws://localhost:8080/ws-stomp/websocket", // 웹소켓 서버로 직접 접속
//       webSocketFactory: () => new SockJS("/ws-stomp"), // proxy를 통한 접속
//       connectHeaders: {
//         "auth-token": "spring-chat-auth-token",
//       },
//       debug: function (str) {
//         console.log(str);
//       },
//       reconnectDelay: 5000,
//       heartbeatIncoming: 4000,
//       heartbeatOutgoing: 4000,
//       onConnect: () => {
//         subscribe();
//       },
//       onStompError: (frame) => {
//         console.error(frame);
//       },
//     });

//     client.current.activate();
//   };

//   const disconnect = () => {
//     client.current.deactivate();
//   };

//   const subscribe = () => {
//     client.current.subscribe(`/sub/chat/${ROOM_SEQ}`, ({ body }) => {
//       setChatMessages((_chatMessages) => [..._chatMessages, JSON.parse(body)]);
//     });
//   };

//   const publish = (message) => {
//     if (!client.current.connected) {
//       return;
//     }

//     client.current.publish({
//       destination: "/pub/chat",
//       body: JSON.stringify({ roomSeq: ROOM_SEQ, message }),
//     });

//     setMessage("");
//   };

//   return (
//     <div>
//       {chatMessages && chatMessages.length > 0 && (
//         <ul>
//           {chatMessages.map((_chatMessage, index) => (
//             <li key={index}>{_chatMessage.message}</li>
//           ))}
//         </ul>
//       )}
//       <div>
//         <input
//           type={"text"}
//           placeholder={"message"}
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           onKeyPress={(e) => e.which === 13 && publish(message)}
//         />
//         <button onClick={() => publish(message)}>send</button>
//       </div>
//     </div>
//   );
// };

// export default App;
