import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TabBarNavigator} from './TabBarNavigator';
import {NewsDetails} from '../features';
import {Login, Register} from '../screens/auth';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  NewsDetails: {
    id: string | null;
    title: string;
    content: string;
    link: string;
    pubDate: string;
  };
};
const Stack = createNativeStackNavigator<RootStackParamList>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Home" component={TabBarNavigator} />
      <Stack.Screen name="NewsDetails" component={NewsDetails} />
    </Stack.Navigator>
  );
};
