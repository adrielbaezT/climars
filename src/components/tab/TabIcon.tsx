import {COLORS} from 'constants/theme';
import React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface TabIconProps {
  name: string;
  focused: boolean;
  iconName: string;
}

export const TabIcon: React.FC<TabIconProps> = ({name, focused, iconName}) => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Icon
        name={iconName}
        size={20}
        style={{
          color: focused ? COLORS.white : COLORS.lightGrayInput,
        }}
      />
      <Text
        style={{
          color: focused ? COLORS.white : COLORS.lightGrayInput,
        }}>
        {name}
      </Text>
    </View>
  );
};
