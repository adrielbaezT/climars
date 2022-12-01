import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SimpleButton} from 'components/buttton/SimpleButton';
import {Section} from 'components/section';
import {Title} from 'components/text';
import {COLORS, SIZES} from 'constants/theme';
import {RegisterForm} from 'features/authentication';
import {RootStackParamList} from 'navigation/StackNavigator';
import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';

type RegisterScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'Register'
>;
export const Register = () => {
  const navigate = useNavigation<RegisterScreenProp>();
  return (
    <ScrollView>
      <View style={styles.container}>
        <Title
          title="Register"
          fontSize={SIZES.h1}
          marginBottom={20}
          marginTop={60}
        />
        <RegisterForm />
        <Section
          appendComponent={
            <Text style={{fontSize: SIZES.h3}}>Already signed up? </Text>
          }
          secondComponent={
            <SimpleButton
              handleOnPress={() => navigate.navigate('Login')}
              appendComponent={
                <Text style={{color: COLORS.purple, fontSize: SIZES.h3}}>
                  Login
                </Text>
              }
            />
          }
        />
      </View>
    </ScrollView>
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
