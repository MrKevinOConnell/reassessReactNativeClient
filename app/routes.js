import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import ChatRoom from './ChatRoom';
import GoalsPage from './GoalsPage';
import Login from './Login';
import SignUp from './SignUp';
import Ionicons from 'react-native-vector-icons/Ionicons';
import 'react-native-gesture-handler';
import {store} from '../store';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Routes = (props) => {
  const [globalState, dispatch] = store();
  const {loggedIn} = globalState;
  const [isIn, setIsIn] = useState(false);

  useEffect(() => {
    setIsIn(loggedIn);
  }, [loggedIn]);
  return (
    <NavigationContainer>
      {isIn ? (
        <Tab.Navigator>
          <Tab.Screen
            name="Chat"
            component={ChatRoom}
            options={{
              title: 'Chat',
              tabBarLabel: 'Chat',
              tabBarIcon: ({color, size}) => (
                <Ionicons
                  name="chatbox-ellipses-outline"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Goals"
            component={GoalsPage}
            options={{
              unmountOnBlur: true,
              title: 'Goals',
              tabBarLabel: 'Goals',
              tabBarIcon: ({color, size}) => (
                <Ionicons name="checkmark-outline" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
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
export default Routes;
