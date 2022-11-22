import {COLORS, SIZES} from 'constants/theme';
import React, {FC} from 'react';
import {Switch, Text, View} from 'react-native';

interface Props {
  toggleCheckBox: boolean;
  setToggleCheckBox: (value: boolean) => void;
}

export const RememberMe: FC<Props> = ({toggleCheckBox, setToggleCheckBox}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Switch
          value={toggleCheckBox}
          onValueChange={newValue => setToggleCheckBox(newValue)}
        />
        <Text style={{color: COLORS.gray, fontSize: SIZES.h3, padding: 10}}>
          {' '}
          Remember Me
        </Text>
      </View>
      <Text style={{color: COLORS.purple, fontSize: SIZES.h3}}>
        Forgot Password?
      </Text>
    </View>
  );
};
