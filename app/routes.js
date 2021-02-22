import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import NonOnboarding from './NonOnboarding';
import Login from './Login';
import SignUp from './SignUp';
import MainMenu from './MainMenu';
import ChatRoom from './ChatRoom';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-gesture-handler';
import {store} from '../store';
import Onboarding from './OnboardingScreen';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Routes = (props) => {
  return <NonOnboarding />;
};
export default Routes;
