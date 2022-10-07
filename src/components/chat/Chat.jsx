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
      onStompError: (frame) => {
        console.log("에러쉬먀", frame);
      },
    });
    client.current.activate();
  };

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
