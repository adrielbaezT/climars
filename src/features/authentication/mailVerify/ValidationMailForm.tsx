import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {COLORS} from '../../../constants/theme';

export const ValidationMailForm = () => {
  return (
    <View>
      <Text>Check your MailCheck your Mail</Text>
      <Text>
        We,ve sent a 6-digit confirmation code to banstolakiran11@gmail.com.
        Make sure you enter correct code.
      </Text>
      <TouchableOpacity
        style={styles.appButtonContainer}
        activeOpacity={0.9}
        onPress={() => console.log('pressed')}>
        <Text style={styles.appButtonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 1050,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: '100%',
    height: 43,
  },
  appButtonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
