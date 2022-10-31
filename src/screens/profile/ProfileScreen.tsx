import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {userVar} from '../../../graphql';
import {COLORS} from '../../constants/theme';
import {OptionMenu} from '../../features';
import {RootStackParamList} from '../../navigation/StackNavigator';

type HomeScreenProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export const ProfileScreen = () => {
  const {navigate} = useNavigation<HomeScreenProp>();

  return (
    <View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 20,
        }}>
        <Text style={[styles.text]}>Configuración</Text>
        <Text style={{fontSize: 15}}>@emasanchezspacex</Text>
      </View>
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
        }}>
        {/* <InputForm
          inputStyle={styles.input}
          colorBackground={COLORS.lightGray3}
          placeholder="Buscar configuración"
          autocomplete="off"
          appendSecondComponent={
            <View style={{justifyContent: 'center', marginRight: 10}}>
              <Icon name="search-outline" size={30} color="black" />
            </View>
          }
        /> */}
      </View>
      <OptionMenu icon="person-circle-outline" title="Tu Cuenta" />
      <OptionMenu
        icon="shield-checkmark-outline"
        title="Privacidad y seguridad"
      />
      <OptionMenu icon="notifications-outline" title="Notificaciones" />
      <OptionMenu icon="globe-outline" title="Lenguajes" />
      <OptionMenu icon="color-palette-outline" title="Personalizar" />
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          marginTop: 20,
        }}>
        <TouchableOpacity
          style={styles.appButtonContainer}
          activeOpacity={0.9}
          onPress={() => {
            userVar(null);
            navigate('Login');
          }}>
          <Text style={styles.appButtonText}>Log out</Text>
          <Icon name="log-out-outline" size={25} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  input: {
    fontSize: 15,
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 1050,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: '100%',
    height: 43,
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  appButtonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    marginRight: 10,
  },
});
