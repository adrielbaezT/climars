import React from 'react';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface GradientBackgroundProps {
  children: JSX.Element | JSX.Element[];
  colors?: string[];
}

export const GradientBackground: React.FC<GradientBackgroundProps> = ({
  children,
}) => {
  return (
    <View style={{flex: 1, width: '100%'}}>
      <LinearGradient
        colors={[
          '#000000',
          'rgba(21, 11, 42, 0.74)',
          'rgba(40, 21, 81, 0.51)',
          'rgba(56, 30, 114, 0.72)',
        ]}
        style={{...StyleSheet.absoluteFillObject}}
      />
      {children}
    </View>
  );
};
