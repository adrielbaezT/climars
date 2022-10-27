import React from 'react';
import {gql, useQuery} from '@apollo/client';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {NewsCard} from './NewsCard';
import {Data} from './interfaces';
import {COLORS, SIZES} from '../../constants/theme';
import Icon from 'react-native-vector-icons/Ionicons';

const GET_NEWS = gql`
  query GetNews {
    getNews {
      id
      title
      content
      link
      pubDate
    }
  }
`;

export const NewsList = () => {
  const {data} = useQuery<Data>(GET_NEWS);

  return (
    <>
      <View
        style={{
          marginVertical: 10,
          marginLeft: 10,
        }}>
        <Text
          style={{
            color: '#a2a2a6',
            marginTop: 27,
          }}>
          Lunes 27, 2022
        </Text>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Text style={styles.title}>Breaking News</Text>
        </View>
        <FlatList
          data={data?.getNews}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <NewsCard
              key={item.id || 'news_' + item.title}
              item={item}
              title="Breaking News"
            />
          )}
        />
      </View>
      <View
        style={{
          marginVertical: 10,
          marginLeft: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Text style={styles.title}>Top Stories</Text>
          <Icon name="chevron-forward-outline" size={29} color="#5c5c5c" />
        </View>
        <FlatList
          data={data?.getNews}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <NewsCard
              key={item.id || 'news_' + item.title}
              item={item}
              title="Top Stories"
              showIcon={true}
              width={148}
            />
          )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.orange,
    marginBottom: 10,
  },
});
