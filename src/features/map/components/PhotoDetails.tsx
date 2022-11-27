import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {COLORS} from 'constants/theme';
import {RootStackParamList} from 'navigation/StackNavigator';
import React, {useEffect, useMemo} from 'react';
import {TouchableOpacity, Text, View, Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {userVar} from 'graphql';
import {useLikes} from '../hooks/useLikes';
import {Comments} from './Comments';
// import {useLikes} from './hooks/useLikes';

export const PhotoDetails = () => {
  const navigate = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'PhotoDetails'>>();
  const {data_like_get, getLikes, addLike, deleteLike, refetchLikes} =
    useLikes();
  const {img_src, id, sol} = route.params;

  useEffect(() => {
    getLikes({
      variables: {
        imgId: id,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  // console.log(data_like_get);
  const isUserLiked = useMemo(() => {
    return (
      data_like_get?.getLikes &&
      data_like_get?.getLikes.some(like => like.str_userId === userVar()?.id)
    );
  }, [data_like_get]);
  const handleAddLike = async () => {
    await addLike({
      variables: {
        imgId: id,
        imgSource: img_src,
        sol,
      },
    });

    await refetchLikes({
      imgId: id,
    });
  };

  const handleDeleteLike = async () => {
    await deleteLike({
      variables: {
        imgId: id,
        imgSource: img_src,
      },
    });
    await refetchLikes({
      imgId: id,
    });
  };

  const handleLike = async () => {
    if (isUserLiked) {
      await handleDeleteLike();
    } else {
      await handleAddLike();
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <Image
        source={{uri: img_src}}
        style={{
          width: '100%',
          height: 350,
          marginRight: 10,
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 10,
        }}>
        <TouchableOpacity activeOpacity={0.8} onPress={handleLike}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10,
            }}>
            <Icon
              name={isUserLiked ? 'heart' : 'heart-outline'}
              size={30}
              color={COLORS.red}
            />
            <Text
              style={{
                fontSize: 22,
              }}>
              {data_like_get?.getLikes?.length || 0}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10,
            }}>
            <Icon name="chatbubbles" size={30} color={COLORS.gray} />
          </View>
        </TouchableOpacity>
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
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Comments imgId={id} imgSrc={img_src} sol={sol} />
        </View>
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
  container: {
    flex: 1,
    padding: 2,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 16,
  },
});
