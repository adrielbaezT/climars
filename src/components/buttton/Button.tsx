import {COLORS} from 'constants/theme';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, Animated, View} from 'react-native';

interface Props {
  title?: string;
  handleOnPress: () => void;
  textStyle?: any;
  appendComponent?: JSX.Element;
  width?: number | string;
  height?: number;
}

export const Button = ({
  title,
  handleOnPress,
  appendComponent,
  textStyle = COLORS.white,
  width = '100%',
  height = 40,
}: Props) => {
  const animatedValue = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(animatedValue, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animatedValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const animatedStyle = {
    transform: [{scale: animatedValue}],
  };

  return (
    <Animated.View style={[animatedStyle]}>
      <TouchableOpacity
        activeOpacity={0.9}
        style={[
          styles.appButtonContainer,
          {
            width,
            height,
          },
        ]}
        onPress={handleOnPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {title && (
            <Text
              style={[
                styles.appButtonText,
                {
                  color: textStyle,
                },
              ]}>
              {title}
            </Text>
          )}
          {appendComponent}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 1050,
    paddingVertical: 10,
    paddingHorizontal: 12,
    height: 43,
    marginTop: 20,
  },
  appButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
