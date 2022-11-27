import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TabBarNavigator} from './TabBarNavigator';
import {Login, Register} from 'screens/auth';
import {NewsDetails, PhotoDetails} from 'features';
import {OnBoardingScreen} from 'screens/onBoarding';
import {VerifyEmailScreen} from 'screens/auth/VerifyEmail';
import {UserAccount} from 'features/profile';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  VerifyEmailScreen: {
    email: string;
    password: string;
  };
  Home: undefined;
  OnBoardingScreen: undefined;
  NewsDetails: {
    id: string | null;
    title: string;
    content: string;
    link: string;
    pubDate: string;
  };
  PhotoDetails: {
    __typename: string;
    earth_date: string;
    id: number;
    img_src: string;
    sol: number;
  };
  UserAccount: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="VerifyEmailScreen" component={VerifyEmailScreen} />
      <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} />
      <Stack.Screen name="Home" component={TabBarNavigator} />
      <Stack.Screen name="NewsDetails" component={NewsDetails} />
      <Stack.Screen name="PhotoDetails" component={PhotoDetails} />
      <Stack.Screen name="UserAccount" component={UserAccount} />
    </Stack.Navigator>
  );
};
