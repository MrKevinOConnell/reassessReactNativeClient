import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Button,
  Platform,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {store} from '../store';
import Modal from 'react-native-modal';
import useChat from './useChat';
import {Appbar, Searchbar} from 'react-native-paper';
import {GiftedChat, InputToolbar} from 'react-native-gifted-chat';
const ChatRoom = (props) => {
  const [globalState, dispatch] = store();
  const {currentUser} = globalState;
  const [id, setId] = useState('');
  const {messages, sendMessage, filterMessages} = useChat(id);
  const [newMessage, setNewMessage] = useState('');
  const [searchMessage, setSearchMessage] = useState('');
  const [searchBarOn, setSearchBar] = useState(false);
  const [storedTempValues, setStoredTempValues] = useState(false);
  const [tempMessages, setTempMessages] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';


  useEffect(() => {
    setId(currentUser.chatRoom);
  }, []);

  const handleNewMessageChange = (event) => {
    setNewMessage(event);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const signOut = () => {
    setModalVisible(!isModalVisible);
    dispatch({type: 'LOGOUT_USER'});
  };

  const handleSearchBarChange = (event) => {
    setSearchMessage(event);
    const filter = messages.filter((message) => message.text.includes(event));
    var finishedFilter = tempMessages.filter(
      (message) => !filter.includes(message) && message.text.includes(event),
    );
    finishedFilter = finishedFilter.concat(filter);
    finishedFilter = finishedFilter.sort((a, b) => a.createdAt > b.createdAt);
    if (event.length === 1 && !storedTempValues) {
      setTempMessages(messages);
      setStoredTempValues(true);
      filterMessages(filter);
    } else if (event === '') {
      filterMessages(tempMessages);
      setTempMessages([]);
      setStoredTempValues(false);
    } else {
      if (finishedFilter.length > filter.length) {
        filterMessages(finishedFilter);
      } else {
        filterMessages(filter);
      }
    }
  };

  const _handleSearch = () => {
    searchBarOn ? setSearchBar(false) : setSearchBar(true);
    if (searchBarOn && searchMessage !== '') {
      filterMessages(tempMessages);
      setSearchMessage('');
      setStoredTempValues(false);
      setTempMessages([]);
    }
  };
  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage('');
  };

  const customModal = (props) => {
    return (
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        transparent={true}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.modal}>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text> WANT MORE INFO ON YOUR LIFE COACH? </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={styles.issueButton}> HAVE AN ISSUE? </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={signOut}>
            <Text> SIGN OUT </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
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
          <Appbar.Content title="Kevin" subtitle="Online!"/>
          <Appbar.Action icon="magnify" onPress={_handleSearch} />
          <Appbar.Action icon={MORE_ICON} onPress={toggleModal} />
        </Appbar.Header>
        <Searchbar
          placeholder="Search"
          onChangeText={handleSearchBarChange}
          value={searchMessage}
        />
        {customModal(props)}
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
           <Appbar.Content title="Kevin" subtitle="Online!"/>
          <Appbar.Action icon="magnify" onPress={_handleSearch} />
          <Appbar.Action
            icon={MORE_ICON}
            onPress={() => {
              setModalVisible(!isModalVisible);
            }}
          />
        </Appbar.Header>
        {customModal(props)}
        <GiftedChat
          messages={messages}
          text={newMessage}
          onInputTextChanged={handleNewMessageChange}
          onSend={handleSendMessage}
          renderInputToolbar={(props) => customInputToolbar(props)}
          inverted={false}
          bottomOffset={75}
          user={{
            _id: currentUser.id,
            name: currentUser.firstName,
          }}
        />
      </View>
    );
  }
};
const {width, height} = Dimensions.get('window');
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
  modal: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: height / 6,
  },
  issueButton: {
    color: 'red',
    fontWeight: 'bold',
  },
});
