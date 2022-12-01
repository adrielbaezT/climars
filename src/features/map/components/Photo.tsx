import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {RootStackParamList} from 'navigation/StackNavigator';
type PhotoScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'PhotoDetails'
>;

export interface SolItem {
  __typename: string;
  earth_date: string;
  id: number;
  img_src: string;
  sol: number;
}

interface Props {
  item: SolItem;
  width?: number;
  height?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
}

export const Photo: React.FC<Props> = ({
  item,
  width,
  height,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
}) => {
  const {navigate} = useNavigation<PhotoScreenProp>();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        navigate('PhotoDetails', item);
      }}>
      <View
        style={{
          width,
          height,
          marginTop,
          marginLeft,
          marginBottom,
          marginRight,
        }}>
        <FastImage
          style={{width, height}}
          source={{
            uri: item.img_src,
            // headers: {Authorization: 'someAuthToken'},
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
      {/* <Image
        source={{uri: item.img_src}}
        style={{
          width,
          height,
          marginRight: 10,
        }}
      /> */}
    </TouchableOpacity>
  );
};
