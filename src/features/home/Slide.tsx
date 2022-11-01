import {COLORS} from 'constants/theme';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  item: {
    id: string;
    time: string;
    icon: string;
    temp: string;
  };
  isFirstItem?: boolean;
}

export const Slide = ({item, isFirstItem = false}: Props) => {
  const color = ['#ea7c46', '#4f378b'];
  return (
    <>
      <LinearGradient
        colors={
          isFirstItem
            ? color
            : ['#rgba(64, 53, 68, 0.5)', '#rgba(217, 217, 217, 0.2)']
        }
        style={[styles.container, {...StyleSheet.absoluteFillObject}]}
        // rotate gradient
        start={{x: 0, y: 0.9}}
        end={{x: 0.9, y: 0.93}}
      />
      <View style={styles.container}>
        <Text style={styles.text}>{item.time}</Text>
        <View style={styles.icon}>
          <Icon
            name={item.icon}
            size={32}
            color={
              item.icon === 'flash' || item.icon === 'sunny'
                ? '#fbbc05'
                : '#4285f4'
            }
          />
        </View>
        <Text style={styles.text}>{item.temp}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 68,
    height: 156,
    borderRadius: 33,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
  },
  text: {
    color: COLORS.white,
    fontSize: 16,
  },
  icon: {
    marginVertical: 16,
  },
});
