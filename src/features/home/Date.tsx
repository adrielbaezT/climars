import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import dayjs from 'dayjs';
import Icon from 'react-native-vector-icons/Ionicons';
import {IconButton} from 'components/buttton';
dayjs.locale('es');

export const Date = () => {
  const [day, setDay] = useState(0);
  const subDay = () => {
    setDay(day - 1);
  };

  const addDay = () => {
    setDay(day + 1);
  };
  // set month
  const month = dayjs().add(day, 'day').format('MMMM');

  return (
    <View style={[styles.center, {flexDirection: 'row'}]}>
      <IconButton
        handleOnPress={subDay}
        textStyle={{
          color: 'white',
        }}
        appendComponent={
          <Icon name="chevron-back-outline" size={29} color="white" />
        }
      />

      <View style={[styles.center, {width: 150, marginHorizontal: 37}]}>
        <Text style={styles.monthText}>{month}</Text>
        <Text style={styles.dayText}>
          {day < 0
            ? dayjs()
                .subtract(day * -1, 'days')
                .format('dddd Do')
            : null}
          {day > 0 ? dayjs().add(day, 'days').format('dddd Do') : null}
          {day === 0 ? dayjs().format('dddd Do') : null}
        </Text>
      </View>
      <IconButton
        handleOnPress={addDay}
        textStyle={{
          color: 'white',
        }}
        appendComponent={
          <Icon name="chevron-forward-outline" size={29} color="white" />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  monthText: {
    fontSize: 18,
    color: 'white',
  },
});
