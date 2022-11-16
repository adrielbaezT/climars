import React, {useEffect} from 'react';
import {gql, useLazyQuery, useQuery, useReactiveVar} from '@apollo/client';
import {FlatList, StyleSheet, Text, View, Image} from 'react-native';
import {NewsCard} from './NewsCard';
import {Data} from './interfaces';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, SIZES} from 'constants/theme';
import {userVar} from 'graphql';

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

const GET_POSTS = gql`
  query GetPosts($img_id: Int) {
    getPosts(img_id: $img_id) {
      post
      id
      str_userId
      user_img
      user_name
      img_id
    }
  }
`;

// const {data} = useQuery<Data>(GET_NEWS, {
//   context:{
//     headers:{
//       authorization: 'Bearer ' + token
//     }
//   }
// });

export const NewsList = () => {
  const user = useReactiveVar(userVar);
  const {data} = useQuery<Data>(GET_NEWS, {
    context: {
      headers: {
        authorization: 'Bearer ' + user?.token,
      },
    },
  });
  const [
    getPosts,
    {
      loading: loading_posts,
      error: error_posts,
      data: data_posts,
      called: calledPosts,
      refetch: refetchPosts,
    },
  ] = useLazyQuery(GET_POSTS, {
    context: {
      headers: {
        authorization: 'Bearer ' + user?.token,
      },
    },
  });

  useEffect(() => {
    if (data) {
      getPosts({
        variables: {
          img_id: data.getNews[0].id,
        },
      });
    }
  }, []);

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
