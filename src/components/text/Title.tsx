import {COLORS} from 'constants/theme';
import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface TitleProps {
  title: string;
  fontSize?: number;
  color?: string;
}
export const Title: FC<TitleProps> = ({
  title,
  fontSize = 30,
  color = COLORS.black,
}) => {
  return (
    <View style={styles.container}>
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
