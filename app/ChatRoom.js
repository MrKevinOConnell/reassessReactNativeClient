import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Button,
  Platform,
} from 'react-native';
import useChat from './useChat';
import {Appbar, Searchbar} from 'react-native-paper';
import {GiftedChat, InputToolbar} from 'react-native-gifted-chat';
const ChatRoom = (props) => {
  const [id, setId] = useState('100');
  const {messages, sendMessage, putBackMessages} = useChat(id);
  const [newMessage, setNewMessage] = useState('');
  const [searchMessage, setSearchMessage] = useState('');
  const [searchBarOn, setSearchBar] = useState(false);
  const [tempMessages, setTempMessages] = useState([]);

  const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

  const handleNewMessageChange = (event) => {
    setNewMessage(event);
  };

  const handleSearchBarChange = (event) => {
    setSearchMessage(event);
  };

  const _handleSearch = () =>
    searchBarOn ? setSearchBar(false) : setSearchBar(true);

  const _handleMore = () => console.log('more');

  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage('');
  };

  const customInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          paddingTop: 4,
          justifyContent: 'center',
        }}
      />
    );
  };

  if (searchBarOn) {
    return (
      <View style={styles.container}>
        <Appbar.Header style={styles.appbar}>
          <Appbar.Content title="Kevin" subtitle="insert online status here" />
          <Appbar.Action icon="magnify" onPress={_handleSearch} />
          <Appbar.Action
            icon={MORE_ICON}
            onPress={() => {
              _handleMore;
            }}
          />
        </Appbar.Header>
        <Searchbar
          placeholder="Search"
          onChangeText={handleSearchBarChange}
          value={searchMessage}
        />
        <GiftedChat
          messages={messages}
          text={newMessage}
          onInputTextChanged={handleNewMessageChange}
          onSend={handleSendMessage}
          renderInputToolbar={(props) => customInputToolbar(props)}
          inverted={false}
          bottomOffset={75}
          user={{
            _id: '1',
          }}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Appbar.Header style={styles.appbar}>
          <Appbar.Content title="Kevin" subtitle="insert online status here" />
          <Appbar.Action icon="magnify" onPress={_handleSearch} />
          <Appbar.Action
            icon={MORE_ICON}
            onPress={() => {
              _handleMore;
            }}
          />
        </Appbar.Header>
        <GiftedChat
          messages={messages}
          text={newMessage}
          onInputTextChanged={handleNewMessageChange}
          onSend={handleSendMessage}
          renderInputToolbar={(props) => customInputToolbar(props)}
          inverted={false}
          bottomOffset={75}
          user={{
            _id: '1',
          }}
        />
      </View>
    );
  }
};

export default ChatRoom;
const styles = StyleSheet.create({
  container: {
    height: 100,
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  appbar: {
    backgroundColor: '#00BFFF',
  },
});
