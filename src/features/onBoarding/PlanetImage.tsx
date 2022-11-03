import {COLORS} from 'constants/theme';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface PlanetImageProps {
  icon: string;
}

export const PlanetImage = ({icon}: PlanetImageProps) => {
  return (
    <View style={styles.container}>
      <Icon name={icon} size={200} color={COLORS.white} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginTop: 100,
  },
});
