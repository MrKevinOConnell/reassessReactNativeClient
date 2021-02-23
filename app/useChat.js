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
          if (messages.length !== recievedMessages.length) {
            setMessages(recievedMessages);
          }
        });

    }
    getMessages();
  }, []);

  useEffect(() => {
    socketRef.current = SocketIOClient(SOCKET_SERVER_URL);
    socketRef.current.emit('join', id);

    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
      setMessages((messages) => [...messages, message]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [id]);
  const sendMessage = (message) => {
    UUIDGenerator.getRandomUUID().then((uuid) => {
      socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
        _id: uuid,
        roomId: id,
        createdAt: new Date(),
        text: message,

        user: {
          _id: currentUser.id,
          name: currentUser.firstName,
        },
      });
    });
    dispatch({type: 'ADD_MESSAGE', payload: {message, id}});
  };

  const filterMessages = (messages) => {
    setMessages(messages);
  };

  return {messages, sendMessage, filterMessages};
};

export default useChat;
