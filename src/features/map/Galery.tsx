import React, {useEffect} from 'react';
import {IconButton} from 'components/buttton';
import {COLORS} from 'constants/theme';
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
import {useGetSol} from './hooks/useGetSol';
import {Photo} from './components/Photo';

export const Galery = () => {
  const {
    data,
    loading,
    getInitialData,
    nsol,
    currSol,
    setCurrSol,
    setNsol,
    loading_pages,
  } = useGetSol();
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

  console.log(nsol, currSol);

  if (loading || !data || loading_pages) {
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

  return (
    <ImageBackground
      source={{
        uri: 'https://mars.nasa.gov/msl-raw-images/msss/01000/mcam/1000MR0044631290503689E01_DXXX.jpg',
      }}
      style={styles.container}>
      <View style={styles.gradient} />
      <View style={styles.changeSol}>
        <IconButton
          handleOnPress={addNsol}
          textStyle={{
            color: 'white',
          }}
          appendComponent={
            <Icon name="chevron-back-outline" size={29} color="white" />
          }
        />
        <Text style={styles.title}>Sol Numero: {currSol}</Text>
        <IconButton
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
          <View style={styles.containerNoInfo}>
            <Text style={styles.text}>No hay info</Text>
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
  containerNoInfo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
