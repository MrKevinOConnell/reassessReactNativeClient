import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Login from './Login';
import SignUp from './SignUp';
import MainMenu from './MainMenu';

import 'react-native-gesture-handler';
import {store} from '../store';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const NonOnboarding = (props) => {
  const [globalState, dispatch] = store();
  const {loggedIn} = globalState;
  const [isIn, setIsIn] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(false);

  useEffect(() => {
    setIsIn(loggedIn);
  }, [loggedIn]);

  return (
    <NavigationContainer>
      {isIn ? (
        <MainMenu />
      ) : (
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerTintColor: 'white',
            headerStyle: {backgroundColor: 'tomato'},
          }}>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Sign Up"
            component={SignUp}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};
export default NonOnboarding;
