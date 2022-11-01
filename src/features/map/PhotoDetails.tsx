import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {COLORS} from 'constants/theme';
import {RootStackParamList} from 'navigation/StackNavigator';
import React, {useState} from 'react';
import {TouchableOpacity, Text, View, Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export const PhotoDetails = () => {
  const navigate = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'PhotoDetails'>>();
  const {sol, img_src} = route.params;
  const [isLiked, setIsLiked] = useState(false);
  return (
    <View>
      <Image
        source={{uri: img_src}}
        style={{
          width: '100%',
          height: 350,
          marginRight: 10,
        }}
      />
      <Text
        style={{
          fontSize: 35,
          fontWeight: 'bold',
          color: COLORS.primary,
          marginTop: 10,
          textAlign: 'center',
        }}>
        Sol Number: {sol}
      </Text>
      {/* Add like and comment section */}
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 10,
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setIsLiked(prev => !prev)}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10,
            }}>
            <Icon
              name={isLiked ? 'heart' : 'heart-outline'}
              size={30}
              color={COLORS.red}
            />
            <Text
              style={{
                fontSize: 22,
              }}>
              {isLiked ? 1 : 0}
            </Text>
          </View>
        </TouchableOpacity>
        <Icon name="chatbubbles" size={30} color={COLORS.gray} />
      </View>
      <View
        style={{
          width: 100,
          position: 'absolute',
          top: 10,
          left: 10,
        }}>
        <TouchableOpacity
          style={styles.appButtonContainer}
          activeOpacity={0.9}
          onPress={() => navigate.goBack()}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Icon name="chevron-back" size={20} color={COLORS.white} />
            <Text style={styles.appButtonText}>Go Back</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 1050,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: '100%',
    height: 43,
  },
  appButtonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
