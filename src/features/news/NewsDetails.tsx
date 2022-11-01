import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {COLORS, SIZES} from 'constants/theme';
import {RootStackParamList} from 'navigation/StackNavigator';
import React from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {nasaImage} from './data';

export const NewsDetails = () => {
  const navigate = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'NewsDetails'>>();
  const {title, content, pubDate} = route.params;

  return (
    <View
      style={{
        position: 'relative',
      }}>
      <View style={styles.container}>
        <Image
          source={{
            uri: nasaImage,
          }}
          style={{
            width: 140,
            height: 134,
          }}
        />
      </View>
      <View
        style={{
          marginHorizontal: 15,
          marginTop: 15,
        }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={[styles.content, {color: 'black'}]}>{content}</Text>
        <Text style={styles.content}>{pubDate}</Text>
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
  container: {
    width: '100%',
    height: 200,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: SIZES.h2,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    fontSize: SIZES.h3,
    marginBottom: 20,
  },
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
