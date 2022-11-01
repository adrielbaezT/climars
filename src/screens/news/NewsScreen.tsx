import React from 'react';
import {View} from 'react-native';
import {NewsList} from 'features';

export const NewsScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'f4f4f4',
      }}>
      <NewsList />
    </View>
  );
};
