import React, {useEffect, useCallback, useState} from 'react';
import {store} from '../store';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

function SignUp({navigation}) {
  const [globalState, dispatch] = store();
  const {
    creatingUser,
    creatingUserError,
    fetchingUser,
    fetchingUserError,
  } = globalState;

  const [fieldValues, setFieldValues] = useState({
    email: '',
    password: '',
    firstName: '',
    age: 0,
  });

  const handleNewMessageChange = (event) => {
    setNewMessage(event);
  };

  const {email, password, firstName, age} = fieldValues;
  const updateEmail = (e) => {
    setFieldValues({
      ...fieldValues,
      email: e,
    });
  };
  const updatePassword = (e) => {
    setFieldValues({
      ...fieldValues,
      password: e,
    });
  };
  const updateFirstName = (e) => {
    setFieldValues({
      ...fieldValues,
      firstName: e,
    });
  };
  const updateAge = (e) => {
    setFieldValues({
      ...fieldValues,
      age: e,
    });
  };
  const onSave = () => {
    dispatch({
      type: 'SIGN_UP',
      payload: {
        email: email,
        password: password,
        firstName: firstName,
        age: age,
      },
    });
    navigation.popToTop();
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email..."
          placeholderTextColor="#003f5c"
          onChangeText={updateEmail}
          value={email}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          onChangeText={updatePassword}
          value={password}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="First name..."
          placeholderTextColor="#003f5c"
          onChangeText={updateFirstName}
          value={firstName}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Age..."
          placeholderTextColor="#003f5c"
          onChangeText={updateAge}
          value={age}
        />
      </View>
      <TouchableOpacity onPress={onSave}>
        <Text style={styles.forgot}>SUBMIT!</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#fb5b5a',
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#465881',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'white',
  },
  forgot: {
    color: 'white',
    fontSize: 11,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
  },
});

export default SignUp;
