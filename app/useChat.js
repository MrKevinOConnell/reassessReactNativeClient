import React, {useEffect, useRef, useState} from 'react';
import SocketIOClient from 'socket.io-client';

const USER_ID = '@userId';
const NEW_CHAT_MESSAGE_EVENT = 'newChatMessage';
const SOCKET_SERVER_URL = 'http://localhost:8080';
const useChat = () => {
  const socketRef = useRef();
  const [messages, setMessages] = useState([]);
  const id = '100';

  useEffect(() => {
    socketRef.current = SocketIOClient(SOCKET_SERVER_URL, {
      query: {id},
    });

    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef.current.id,
      };
      setMessages((messages) => [...messages, incomingMessage]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [id]);

  const sendMessage = (message) => {
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      body: message,
      senderId: socketRef.current.id,
    });
  };
  return {messages, sendMessage};
};

export default useChat;
