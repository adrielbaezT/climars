import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {onboardingScreens} from 'constants/onboardingScreens';
import {COLORS, SIZES} from 'constants/theme';
import {PlanetImage, Steps, TextContent} from 'features/onBoarding';
import {onBoardingVar} from 'graphql';
import {RootStackParamList} from 'navigation/StackNavigator';
import React from 'react';
import {Text, View, StyleSheet, Animated, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

type flatListRefProps = {
  scrollToIndex: (params: {index: number; animated: boolean}) => void;
};

type OnBoardingScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'OnBoardingScreen'
>;

export const OnBoardingScreen = () => {
  const {navigate} = useNavigation<OnBoardingScreenProp>();
  const gradientColors = ['#ea7c46', '#4f378b'];
  const flatListRef = React.useRef<flatListRefProps>();
  const scrollX = new Animated.Value(0);

  const handleNext = () => {
    let nextIndex = 0;
    let currentIndex = Math.ceil(scrollX._value / SIZES.width);
    if (onboardingScreens.length - 1 > currentIndex) {
      nextIndex = currentIndex + 1;
      flatListRef?.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
    } else {
      onBoardingVar(false);
      navigate('Home');
    }
  };

  const handleSkip = () => {
    onBoardingVar(false);
    navigate('Home');
  };
  return (
    <LinearGradient
      style={{
        flex: 1,
      }}
      colors={gradientColors}>
      <View style={styles.container}>
        <View
          style={{
            width: 320,
            alignItems: 'flex-end',
            marginTop: 25,
          }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              handleSkip();
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 16,
              }}>
              Skip
            </Text>
          </TouchableOpacity>
        </View>
        <Animated.FlatList
          ref={flatListRef}
          horizontal
          pagingEnabled
          data={onboardingScreens}
          scrollEventThrottle={16}
          snapToAlignment="center"
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}
          keyExtractor={item => `${item.title}`}
          renderItem={({item}) => {
            return (
              <View style={styles.onboardingContainer}>
                <View style={styles.content}>
                  <PlanetImage icon={item.icon} />
                  <TextContent
                    title={item.title}
                    description={item.description}
                  />
                </View>
                <Steps
                  scrollX={scrollX}
                  componet={
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        handleNext();
                      }}>
                      <View style={styles.button}>
                        <Icon
                          name="arrow-forward-outline"
                          size={30}
                          color={COLORS.white}
                        />
                      </View>
                    </TouchableOpacity>
                  }
                />
              </View>
            );
          }}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  onboardingContainer: {
    width: SIZES.width,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    width: SIZES.width * 0.8,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
