import React, {useEffect, useRef, useState} from 'react';
import UUIDGenerator from 'react-native-uuid-generator';
import axios from 'axios';
import SocketIOClient from 'socket.io-client';
import {store} from '../store';

const NEW_CHAT_MESSAGE_EVENT = 'newChatMessage';
const SOCKET_SERVER_URL = 'http://localhost:8080';
const useChat = (id) => {
  const [globalState, dispatch] = store();
  const {currentUser} = globalState;
  const socketRef = useRef();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function getMessages() {
      await axios
        .get(`${SOCKET_SERVER_URL}/api/chatrooms/${id}/messages`, {
          params: {
            id: id,
          },
        })
        .then((res) => {
          const recievedMessages = res.data;
          if (messages.length !== recievedMessages.length)
            setMessages(recievedMessages);
        });
    }
    getMessages();
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
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [id]);
  const sendMessage = (message) => {
    UUIDGenerator.getRandomUUID().then((uuid) => {
      socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
        _id: uuid,
        createdAt: new Date(),
        text: message,
        user: {
          _id: currentUser.id,
          name: currentUser.firstName,
        },
      });
    });
  };

  const filterMessages = (messages) => {
    setMessages(messages);
  };

  return {messages, sendMessage, filterMessages};
};

export default useChat;
