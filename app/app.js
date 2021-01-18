import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ChatRoom from './ChatRoom';
import {Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

function GoalsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Goals!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Chat"
          component={ChatRoom}
          options={{
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
          component={GoalsScreen}
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
