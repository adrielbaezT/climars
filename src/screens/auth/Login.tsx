import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {COLORS, SIZES} from 'constants/theme';
import LoginForm from 'features/authentication/login/LoginForm';
import {onBoardingVar, userVar} from 'graphql';
import {RootStackParamList} from 'navigation/StackNavigator';
import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
// import OTPInputView from '@twotalltotems/react-native-otp-input';

type LoginScreenProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;
export const Login = () => {
  const {navigate} = useNavigation<LoginScreenProp>();

  return (
    <View style={styles.container}>
      {/* <OTPInputView
        style={{width: '80%', height: 200}}
        pinCount={4}
        autoFocusOnLoad
        onCodeFilled={code => {
          console.log(`Code is ${code}, you are good to go!`);
        }}
      /> */}
      <View
        style={{
          marginTop: 70,
          marginBottom: 36,
          alignItems: 'center',
        }}>
        <Text style={styles.title}>Login</Text>
      </View>
      <LoginForm />
      <View>
        <View style={[styles.center, {marginTop: 50}]}>
          <View style={styles.separator} />
          <Text
            style={{
              fontSize: SIZES.h3,
              color: COLORS.gray2,
              paddingHorizontal: 10,
            }}>
            or continue with
          </Text>
          <View style={styles.separator} />
        </View>
        <View style={[styles.center, {marginTop: 20}]}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              userVar({
                email: 'pruebagoogle@gmail.com',
                password: '1234569',
              });
              if (onBoardingVar()) {
                return navigate('OnBoardingScreen');
              }
              onBoardingVar(false);
              navigate('Home');
            }}>
            <Image source={require('../../assets/img/google.png')} />
          </TouchableOpacity>
        </View>
        <View style={[styles.center, {marginTop: 80}]}>
          <Text style={{fontSize: SIZES.h3}}>Don't have an account? </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigate('Register')}>
            <Text style={{color: COLORS.purple, fontSize: SIZES.h3}}>
              Signup
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
  },
  title: {
    color: COLORS.gray,
    fontSize: SIZES.h1,
    fontWeight: '600',
  },
  separator: {
    flex: 1,
    height: 2,
    backgroundColor: COLORS.lightGray3,
  },
  center: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
