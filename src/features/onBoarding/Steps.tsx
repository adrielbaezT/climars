import {onboardingScreens} from 'constants/onboardingScreens';
import {COLORS, SIZES} from 'constants/theme';
import React from 'react';
import {View, StyleSheet, Animated} from 'react-native';

interface Props {
  scrollX: Animated.Value;
  componet: JSX.Element;
}

export const Steps = ({scrollX, componet}: Props) => {
  const dotPosition = Animated.divide(scrollX, SIZES.width);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {onboardingScreens.map((item, index) => {
          const dotWidth = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [7, 30, 7],
            extrapolate: 'clamp',
          });
          const dotColor = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [COLORS.lightGray, COLORS.white, COLORS.lightGray],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={`dot_${index}`}
              style={[
                styles.dot,
                {
                  width: dotWidth,
                  backgroundColor: dotColor,
                },
              ]}
            />
          );
        })}
      </View>
      {componet}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 320,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 50,
    paddingHorizontal: 20,
  },
  dot: {
    borderRadius: 5,
    marginHorizontal: 5,
    height: 7,
  },
});
