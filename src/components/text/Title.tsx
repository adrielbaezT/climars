import {COLORS} from 'constants/theme';
import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface TitleProps {
  title: string;
  fontSize?: number;
  color?: string;
  marginBottom?: number;
  marginTop?: number;
}
export const Title: FC<TitleProps> = ({
  title,
  fontSize = 30,
  color = COLORS.black,
  marginBottom = 20,
  marginTop = 20,
}) => {
  return (
    <View style={[styles.container, {marginBottom, marginTop}]}>
      <Text
        style={[
          styles.title,
          {
            fontSize,
            color,
          },
        ]}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
  },
  container: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
