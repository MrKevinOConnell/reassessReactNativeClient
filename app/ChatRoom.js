import React, {useState, useEffec, useCallbackt} from 'react';
import {StyleSheet, TextInput, Text, View, Button} from 'react-native';
import useChat from './useChat';
import {GiftedChat} from 'react-native-gifted-chat';
const ChatRoom = (props) => {
  const [id, setId] = useState('100');
  const {messages, sendMessage} = useChat(id);
  const [newMessage, setNewMessage] = useState('');

  const handleNewMessageChange = (event) => {
    setNewMessage(event);
  };
  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage('');
  };

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        text={newMessage}
        onInputTextChanged={handleNewMessageChange}
        onSend={handleSendMessage}
        inverted={false}
        bottomOffset={80}
        user={{
          _id: '1',
        }}
      />
    </View>
  );
};

export default ChatRoom;
const styles = StyleSheet.create({
  container: {
    height: 200,
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});
