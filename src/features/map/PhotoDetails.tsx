import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {COLORS} from 'constants/theme';
import {RootStackParamList} from 'navigation/StackNavigator';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  Image,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import BottomSheet from '@gorhom/bottom-sheet';
import {Comments} from './components';
// import {useLikes} from './hooks/useLikes';

export const PhotoDetails = () => {
  const navigate = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'PhotoDetails'>>();
  const {img_src, id, sol} = route.params;
  const [isLiked, setIsLiked] = useState(false);

  // Bottom Sheet
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [isOpen, setIsOpen] = useState(false);

  // variables
  const platformDimension = Platform.OS === 'ios' ? 'screen' : 'window';
  const {height: screenHeight} = Dimensions.get(platformDimension);
  const snapPoints = useMemo(
    () => [`${screenHeight * 0.4}%`, `${screenHeight * 0.5}%`],
    [screenHeight],
  );

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    bottomSheetRef.current?.snapToIndex(index);
    setIsOpen(true);
  }, []);

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
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => handleSheetChanges(0)}>
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
