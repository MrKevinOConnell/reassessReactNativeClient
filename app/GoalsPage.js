import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Button,
  Platform,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import {Appbar} from 'react-native-paper';

const GoalsPage = (props) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  let fullWidth = Dimensions.get('window').height;

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
            <Text> EDIT YOUR GOALS </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };
  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appbar}>
        <Appbar.Content title="Goals" />
        <Appbar.Action
          icon={MORE_ICON}
          onPress={() => {
            setModalVisible(!isModalVisible);
          }}
        />
      </Appbar.Header>
      {customModal(props)}
      <View style={styles.goals}>
        <Text style={{fontWeight: 'bold', fontSize: 25}}>Daily Goal:</Text>
        <Text style={{fontFamily: 'Futura'}}>To build an app</Text>
        <Text style>Start with the configuration</Text>
        <Text style={{fontWeight: 'bold', fontSize: 25}}>Weekly Goal:</Text>
        <Text style={{fontFamily: 'Futura'}}>Go to the gym twice a week</Text>
        <Text style>Insert AI line here</Text>
        <Text style={{fontWeight: 'bold', fontSize: 25}}>Monthly Goal:</Text>
        <Text style={{fontFamily: 'Futura'}}>To not suck at coding</Text>
        <Text style>Insert AI line here</Text>
        <Text style={{fontWeight: 'bold', fontSize: 25}}>Yearly Goal:</Text>
        <Text style={{fontFamily: 'Futura'}}>me make lots of money</Text>
        <Text style>Insert AI line here</Text>
      </View>
    </View>
  );
};
const {width, height} = Dimensions.get('window');
export default GoalsPage;
const styles = StyleSheet.create({
  container: {
    width: width,
    height: height / 10,
  },
  goals: {
    height: height / 1.25,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#F5FCFF',
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
  appbar: {
    backgroundColor: '#00BFFF',
  },
});
