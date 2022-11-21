import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

interface ButtonProps {
  title?: string;
  handleOnPress: () => void;
  opacity?: number;
  textStyle?: any;
  appendComponent?: JSX.Element;
}

export const IconButton = ({
  title,
  handleOnPress,
  opacity = 0.8,
  textStyle,
  appendComponent,
}: ButtonProps) => {
  return (
    <TouchableOpacity onPress={handleOnPress} activeOpacity={opacity}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {title && <Text style={{...textStyle}}>{title}</Text>}
        {appendComponent}
      </View>
    </TouchableOpacity>
  );
};
