import {COLORS} from 'constants/theme';
import React from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import {Slide} from './Slide';

export const Weather = () => {
  const data = [
    {
      id: '1',
      time: '01:00',
      icon: 'cloudy',
      temp: '-20º',
    },
    {
      id: '2',
      time: '04:00',
      icon: 'flash',
      temp: '-220º',
    },
    {
      id: '3',
      time: '04:00',
      icon: 'sunny',
      temp: '-220º',
    },
    {
      id: '4',
      time: '04:00',
      icon: 'flash',
      temp: '-220º',
    },
    {
      id: '5',
      time: '10:00',
      icon: 'flash',
      temp: '-220º',
    },
    {
      id: '6',
      time: '14:00',
      icon: 'flash',
      temp: '-220º',
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Ahora</Text>
      </View>
      <FlatList
        data={data}
        renderItem={({item, index}: any) => (
          <Slide item={item} isFirstItem={index === 0} />
        )}
        keyExtractor={item => item.id}
        horizontal
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    height: 200,
  },
  textContainer: {
    width: 68,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    color: COLORS.white,
    marginBottom: 16,
  },
});
