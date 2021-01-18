import React, {useEffect, useRef, useState} from 'react';
import uuid from 'uuid-random';
import axios from 'axios';
import SocketIOClient from 'socket.io-client';

const USER_ID = '@userId';
const NEW_CHAT_MESSAGE_EVENT = 'newChatMessage';
const SOCKET_SERVER_URL = 'http://localhost:8080';
const useChat = () => {
  const socketRef = useRef();
  const [messages, setMessages] = useState([]);
  const id = '100';

  useEffect(() => {
    axios
      .get(`${SOCKET_SERVER_URL}/api/chatrooms/${id}/messages`, {
        params: {
          id: id,
        },
      })
      .then((res) => {
        const messages = res.data;
        setMessages(messages);
      });
  }, []);

  useEffect(() => {
    socketRef.current = SocketIOClient(SOCKET_SERVER_URL, {
      query: {id},
    });

    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.user._id === socketRef.current.id,
      };
      setMessages((messages) => [...messages, incomingMessage]);
      const payload = {id, message};
      axios
        .post(`${SOCKET_SERVER_URL}/api/chatrooms/${id}/messages`, payload)
        .then((response) => {
          if (response.data.status) {
            console.log(response);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [id]);
  const sendMessage = (message) => {
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      _id: uuid(),
      createdAt: new Date(),
      text: message,
      user: {_id: '1'},
    });
  };
  return {messages, sendMessage};
};

export default useChat;
