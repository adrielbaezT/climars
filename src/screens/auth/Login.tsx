import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SimpleButton} from 'components/buttton/SimpleButton';
import {Section} from 'components/section';
import {Title} from 'components/text';
import {COLORS, SIZES} from 'constants/theme';
import {user} from 'data';
import LoginForm from 'features/authentication/login/LoginForm';
import {onBoardingVar, userVar} from 'graphql';
import {RootStackParamList} from 'navigation/StackNavigator';
import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

type LoginScreenProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;
export const Login = () => {
  const {navigate} = useNavigation<LoginScreenProp>();
  const handleOnPress = () => {
    userVar(user);
    if (onBoardingVar()) {
      return navigate('OnBoardingScreen');
    }
    onBoardingVar(false);

    navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Title
        title="Login"
        fontSize={SIZES.h1}
        marginBottom={20}
        marginTop={60}
      />
      <LoginForm />
      <View>
        <Section>
          <>
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
          </>
        </Section>

        <Section>
          <SimpleButton
            handleOnPress={handleOnPress}
            appendComponent={
              <Image source={require('../../assets/img/google.png')} />
            }
          />
        </Section>
        <Section
          appendComponent={
            <Text style={{fontSize: SIZES.h3}}>Don't have an account? </Text>
          }
          secondComponent={
            <SimpleButton
              handleOnPress={() => navigate('Register')}
              appendComponent={
                <Text style={{color: COLORS.purple, fontSize: SIZES.h3}}>
                  Signup
                </Text>
              }
            />
          }
        />
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
