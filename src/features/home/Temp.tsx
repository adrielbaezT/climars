import React from 'react';
import {COLORS} from 'constants/theme';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export const Temp = () => {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Icon name="moon" size={29} color="#fbbc05" />
      </View>
      <Text style={styles.tempText}>-200º</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 40,
    position: 'relative',
  },
  tempText: {
    fontSize: 60,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  icon: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
