import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useForm} from 'react-hook-form';
import {OptionMenu} from 'features/profile';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from 'constants/theme';
import {RootStackParamList} from 'navigation/StackNavigator';
import {userVar} from 'graphql';
import {InputText} from 'components/form/text';

const OPTIONS = [
  {
    icon: 'person-circle-outline',
    title: 'Tu Cuenta',
  },
  {
    icon: 'shield-checkmark-outline',
    title: 'Privacidad y seguridad',
  },
  {icon: 'notifications-outline', title: 'Notificaciones'},
  {icon: 'globe-outline', title: 'Lenguajes'},
  {icon: 'color-palette-outline', title: 'Personalizar'},
];

type HomeScreenProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
type TextData = {
  search: string;
};

export const ProfileScreen = () => {
  const {navigate} = useNavigation<HomeScreenProp>();
  const user = userVar();
  const {control} = useForm<TextData>({
    defaultValues: {
      search: '',
    },
  });

  return (
    <View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 15,
        }}>
        <Text style={[styles.text]}>Configuración</Text>
        <Text style={{fontSize: 15}}>{user?.email}</Text>
      </View>
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
        }}>
        <InputText
          control={control}
          name="search"
          keyboardType="default"
          placeholder="Buscar configuración"
          inputStyle={styles.input}
          appendSecondComponent={
            <View style={{justifyContent: 'center', marginRight: 10}}>
              <Icon name="search" size={20} color={COLORS.gray} />
            </View>
          }
        />
      </View>
      {OPTIONS.map((option, index) => (
        <OptionMenu
          key={option.title + index}
          icon={option.icon}
          title={option.title}
        />
      ))}
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
