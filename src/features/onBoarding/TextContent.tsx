import {COLORS, SIZES} from 'constants/theme';
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

interface Props {
  title: string;
  description: string;
}
export const TextContent = ({title, description}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    marginBottom: 26,
    width: '100%',
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
    width: 243,
  },
  title: {
    fontSize: SIZES.h3,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  description: {
    fontSize: SIZES.h4,
    color: COLORS.lightGray,
    textAlign: 'center',
  },
});
