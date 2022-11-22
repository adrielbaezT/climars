import React from 'react';
import {IconButton} from 'components/buttton';
import {COLORS} from 'constants/theme';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  item: {
    id: string;
    icon: string;
    weather: string;
    status: string;
  };
}
export const WeatherCard: React.FC<Props> = ({item}) => {
  return (
    <>
      <LinearGradient
        colors={['#rgba(64, 53, 68, 0.5)', '#rgba(217, 217, 217, 0.2)']}
        style={[styles.container]}
        // rotate gradient
        start={{x: 0, y: 0.9}}
        end={{x: 1, y: 1}}>
        <View style={styles.container}>
          <Icon name={item.icon} size={60} color={COLORS.white} />
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.text}>{item.weather}</Text>
            <Text style={styles.weatherText}>{item.status}</Text>
          </View>
          <IconButton
            handleOnPress={() => console.log('pressed')}
            textStyle={{
              color: 'white',
            }}
            appendComponent={
              <Icon name="chevron-forward-outline" size={29} color="white" />
            }
          />
        </View>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 103,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  textContainer: {
    width: 68,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 12,
    color: COLORS.white,
  },
  weatherText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
  },
});
