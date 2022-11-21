import {useNavigation} from '@react-navigation/native';
import {COLORS, SIZES} from 'constants/theme';
import {RegisterForm} from 'features/authentication';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export const Register = () => {
  const navigate = useNavigation();
  return (
    <ScrollView>
      <View style={styles.container}>
        <View
          style={{
            marginTop: 50,
            marginBottom: 36,
            alignItems: 'center',
          }}>
          <Text style={styles.title}>Sign up</Text>
        </View>
        <RegisterForm />
        <View style={[styles.center, {marginTop: 20}]}>
          <Text style={{fontSize: SIZES.h3}}>Already signed up? </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigate.goBack()}>
            <Text style={{color: COLORS.purple, fontSize: SIZES.h3}}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
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
