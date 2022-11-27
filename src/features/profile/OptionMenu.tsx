import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {COLORS, SIZES} from 'constants/theme';
import {RootStackParamList} from 'navigation/StackNavigator';
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  icon: string;
  title: string;
}

type AccountScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'UserAccount'
>;

export const OptionMenu: React.FC<Props> = ({icon, title}) => {
  const {navigate} = useNavigation<AccountScreenProp>();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigate('UserAccount')}>
      <View style={styles.container}>
        <Icon name={icon} size={30} color="#a2a2a6" />
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text
            style={{
              fontSize: SIZES.h4,
            }}>
            nobis suscipit dolorum itaque, perspiciatis culpa rem
          </Text>
        </View>
        <Icon name="chevron-forward-outline" size={30} color="#a2a2a6" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  content: {
    width: 243,
  },
  title: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.gray,
  },
});
