import React, {useMemo, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {OptionMenu} from 'features/profile';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from 'constants/theme';
import {RootStackParamList} from 'navigation/StackNavigator';
import {userVar} from 'graphql';
import {useDebouncedText} from 'hooks';
import {Button} from 'components/buttton';

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

export const ProfileScreen = () => {
  const {navigate} = useNavigation<HomeScreenProp>();
  const user = userVar();
  const [search, setSearch] = useState<string>('');

  const {value} = useDebouncedText(search, 700);
  const optionsFiltered = useMemo(() => {
    return OPTIONS.filter(
      option =>
        option.title.toLowerCase().trim().includes(value.toLowerCase()) ||
        value === '',
    );
  }, [value]);

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
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Buscar configuración"
            onChangeText={text => setSearch(text)}
          />
          <Icon name="search" size={20} color={COLORS.gray} />
        </View>
      </View>
      {optionsFiltered.map((option, index) => (
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
        <Button
          title="Log out"
          handleOnPress={() => {
            userVar(null);
            navigate('Login');
          }}
          appendComponent={
            <Icon
              name="log-out-outline"
              size={25}
              color="white"
              style={{
                marginLeft: 10,
              }}
            />
          }
        />
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.lightGray,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 5,
  },
});
