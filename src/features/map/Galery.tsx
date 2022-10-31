import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button} from '../../components/buttton';
import {COLORS} from '../../constants/theme';
import {useGetSol} from './hooks/useGetSol';
import {Photo} from './Photo';

export const Galery = () => {
  const {data, loading, getInitialData, nsol, currSol, setCurrSol, setNsol} =
    useGetSol();
  const addNsol = () => {
    setNsol(nsol - 1);
    setCurrSol(currSol - 1);
  };
  const subNsol = () => {
    if (nsol >= 0) {
      Alert.alert('Sorry', 'No more sols');
      return;
    }

    setNsol(nsol + 1);
    setCurrSol(currSol + 1);
  };
  useEffect(() => {
    getInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading || !data) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size={80} color={COLORS.primary} />
      </View>
    );
  }
  console.log('sol', data?.getPhotos[0]);

  return (
    <ImageBackground
      source={{
        uri: 'https://mars.nasa.gov/msl-raw-images/msss/01000/mcam/1000MR0044631290503689E01_DXXX.jpg',
      }}
      style={styles.container}>
      <View style={styles.gradient} />
      <View style={styles.changeSol}>
        <Button
          handleOnPress={addNsol}
          textStyle={{
            color: 'white',
          }}
          appendComponent={
            <Icon name="chevron-back-outline" size={29} color="white" />
          }
        />
        <Text style={styles.title}>Sol Numero: {currSol}</Text>
        <Button
          handleOnPress={subNsol}
          textStyle={{
            color: 'white',
          }}
          appendComponent={
            <Icon name="chevron-forward-outline" size={29} color="white" />
          }
        />
      </View>
      <View style={styles.galery}>
        {data?.getPhotos.length === 0 ? (
          <View>
            <Text>No hay info</Text>
          </View>
        ) : (
          <FlatList
            data={data?.getPhotos}
            keyExtractor={item => item.id.toString()}
            horizontal
            renderItem={({item}) => (
              <Photo item={item} width={251} height={251} />
            )}
          />
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  galery: {
    width: '100%',
    height: 150,
    marginBottom: 150,
    marginLeft: 10,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    backgroundColor: 'rgba(62, 33, 77, 0.6)',
  },
  changeSol: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
