import {GradientBackground, WeatherCard} from 'components';
import {Date, Temp, Weather} from 'features/home';
import React from 'react';
import {ImageBackground, View} from 'react-native';

export const HomeScreen = () => {
  const data1 = [
    {
      id: '1',
      weather: 'cloudy',
      status: '150 km/h',
      icon: 'cloudy',
    },
    {
      id: '2',
      weather: 'Storm',
      status: '60 %',
      icon: 'thunderstorm',
    },
  ];

  return (
    <ImageBackground
      source={require('../../assets/img/marsph.jpg')}
      style={{
        flex: 1,
        alignItems: 'center',
        // todo make gradient background
      }}>
      <GradientBackground>
        <View
          style={{
            flex: 1,
            width: '100%',
            alignItems: 'center',
            zIndex: 10,
            // todo make gradient background
          }}>
          <Date />
          <Temp />
          <Weather />
          {data1.map(item => (
            <WeatherCard key={`item_${item.id}`} item={item} />
          ))}
        </View>
      </GradientBackground>
    </ImageBackground>
  );
};
