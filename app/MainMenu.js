import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ChatRoom from './ChatRoom';
import GoalsPage from './GoalsPage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-gesture-handler';
import {store} from '../store';
const Tab = createBottomTabNavigator();

const MainMenu = (props) => {
  return (
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
  );
};
export default MainMenu;
