import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TouchableOpacity, Image} from 'react-native';
import {RootStackParamList} from '../../navigation/StackNavigator';
import {useNavigation} from '@react-navigation/native';
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
}

export const Photo: React.FC<Props> = ({item, width, height}) => {
  const {navigate} = useNavigation<PhotoScreenProp>();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        navigate('PhotoDetails', item);
      }}>
      <Image
        source={{uri: item.img_src}}
        style={{
          width,
          height,
          marginRight: 10,
        }}
      />
    </TouchableOpacity>
  );
};
