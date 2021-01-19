import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ChatRoom from './ChatRoom';
import GoalsPage from './GoalsPage';
import {Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
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
            tabBarLabel: 'Goals',
            tabBarIcon: ({color, size}) => (
              <Ionicons name="checkmark-outline" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
