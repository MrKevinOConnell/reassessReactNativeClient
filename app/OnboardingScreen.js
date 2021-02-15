import React, {useRef} from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignUp from './SignUp'
import {store} from '../store';
import Ionicons from 'react-native-vector-icons/Ionicons';

const OnboardingScreen = ({navigation}) => {
  const completedOnBoarding = async () => {
    await AsyncStorage.setItem('hasOnboarded', JSON.stringify(true));
    navigation.navigate('Login');
  };
  return (
    <Onboarding
      onDone={completedOnBoarding}
      showSkip={false}
      pages={[
        {
          backgroundColor: '#003f5c',
          image: <Ionicons name="checkmark-outline" />,
          title: 'Page One',
          subtitle: 'first page of onboard',
        },
        {
          backgroundColor: '#003f5c',
          title: "LET'S SIGN UP!",
          image: <Ionicons name="checkmark-outline" />,
          subtitle: <SignUp />,
        },
      ]}
    />
  );
};

export default OnboardingScreen;
