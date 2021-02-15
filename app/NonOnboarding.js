import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  createStackNavigator,
  StackViewTransitionConfigs,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Login from './Login';
import SignUp from './SignUp';
import MainMenu from './MainMenu';
import Onboarding from "./OnboardingScreen"
import 'react-native-gesture-handler';
import {store} from '../store';

const Stack = createStackNavigator();
const NonOnboarding = (props) => {
  const [globalState, dispatch] = store();
  const {loggedIn} = globalState;
  const [isIn, setIsIn] = useState(false);

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
            name="Onboard"
            component={Onboarding}
            options={{headerShown: false}}
          />
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
