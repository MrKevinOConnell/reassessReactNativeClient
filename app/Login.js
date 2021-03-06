import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {store} from '../store';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Keyboard,
} from 'react-native';
const Login = ({navigation}) => {
  function handleLoginClick() {
    dispatch({type: 'LOGIN_USER', payload: {email, password}});
  }
  const [globalState, dispatch] = store();
  const {isOnboard} = globalState;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(e) {
    setEmail(e);
  }

  function handlePasswordChange(e) {
    setPassword(e);
  }

  useEffect(() => {
    completedOnBoarding();
  }, []);

  const completedOnBoarding = async () => {
    const onboard = await AsyncStorage.getItem('hasOnboarded');
    const isOnboard = JSON.parse(onboard);
    if (!isOnboard) {
      navigation.navigate('Onboard');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>REASSESS</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          value={email}
          placeholder="Email..."
          placeholderTextColor="#003f5c"
          onChangeText={handleEmailChange}
          blurOnSubmit={false}
          onSubmitEditing={() => Keyboard.dismiss()}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          value={password}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          onChangeText={handlePasswordChange}
          blurOnSubmit={false}
          onSubmitEditing={() => Keyboard.dismiss()}
        />
      </View>
      <TouchableOpacity>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={handleLoginClick}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
};
const {width, height} = Dimensions.get('window');
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
    color: '#00BFFF',
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
    backgroundColor: '#00BFFF',
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
export default Login;
