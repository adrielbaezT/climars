import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {COLORS, SIZES} from 'constants/theme';
import {RootStackParamList} from 'navigation/StackNavigator';
import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {nasaImage} from './data';

interface NewsCardProps {
  title: string;
  width?: number;
  showIcon?: boolean;
  item: {
    id: string | null;
    title: string;
    content: string;
    link: string;
    pubDate: string;
  };
}

type NewsScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'NewsDetails'
>;

export const NewsCard: React.FC<NewsCardProps> = ({width = 251, item}) => {
  const {navigate} = useNavigation<NewsScreenProp>();
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() =>
        navigate('NewsDetails', {
          id: item.id,
          title: item.title,
          content: item.content,
          link: item.link,
          pubDate: item.pubDate,
        })
      }>
      <View style={[styles.card, {width}]}>
        <View style={styles.content}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={{
                uri: nasaImage,
              }}
              style={{
                width: width < 239 ? 110 : 140,
                height: width < 239 ? 96 : 134,
                borderRadius: 10,
              }}
            />
            <Text
              style={{
                color: COLORS.black,
                fontWeight: 'bold',
              }}>
              {item.title}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            <Text
              style={{
                color: '#a2a2a6',
              }}>
              Lunes 27, 2022
            </Text>
            <Icon name="bookmark-outline" size={20} color="#a2a2a6" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.orange,
  },
  card: {
    height: 256,
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
    borderRadius: 10,
    marginRight: 10,
  },
  content: {
    marginHorizontal: 6,
    marginTop: 7,
    flex: 1,
    justifyContent: 'space-between',
  },
});
