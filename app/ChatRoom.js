import React, {useState, useEffect} from 'react';
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
  const chatMessages = messages.map((message, idx) => (
    <Text style={{borderWidth: 2, top: 500}} key={idx}>
      {message.body}
    </Text>
  ));
  return (
    <View style={styles.container}>
      {chatMessages}
      <TextInput
        style={{height: 40, borderWidth: 2, top: 200}}
        autoCorrect={false}
        value={messages}
        onChangeText={(chatMessage) => {
          setNewMessage(chatMessage);
        }}
      />
      <Button title="Submit" onPress={handleSendMessage} />
    </View>
  );
};

export default ChatRoom;
const styles = StyleSheet.create({
  container: {
    height: 400,
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});
