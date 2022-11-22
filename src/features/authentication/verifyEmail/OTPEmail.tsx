import React from 'react';
import {COLORS} from 'constants/theme';
import {StyleSheet, View} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';

interface Props {
  onOTPChange: (otp: string) => void;
}

export const OTPEmail: React.FC<Props> = ({onOTPChange}) => {
  return (
    <View>
      <OTPInputView
        style={{width: '90%', height: 200}}
        pinCount={6}
        codeInputFieldStyle={styles.border}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        onCodeFilled={code => {
          onOTPChange(code);
        }}
        keyboardType="default"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45,
  },
  border: {
    width: 47,
    height: 65,
    color: COLORS.black,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: COLORS.gray,
    backgroundColor: COLORS.lightGray,
  },
  underlineStyleHighLighted: {
    borderColor: COLORS.primary,
  },
});
