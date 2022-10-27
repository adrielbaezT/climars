import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, SIZES} from '../../constants/theme';

interface Props {
  icon: string;
  title: string;
}

export const OptionMenu: React.FC<Props> = ({icon, title}) => {
  return (
    <View style={styles.container}>
      <Icon name={icon} size={30} color="#a2a2a6" />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text
          style={{
            fontSize: SIZES.h4,
          }}>
          nobis suscipit dolorum itaque, perspiciatis culpa rem
        </Text>
      </View>
      <Icon name="chevron-forward-outline" size={30} color="#a2a2a6" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  content: {
    width: 243,
  },
  title: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.gray,
  },
});
