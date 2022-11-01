import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Switch,
} from 'react-native';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {RootStackParamList} from 'navigation/StackNavigator';
import {loginSchema} from './validations/loginSchema';
import {userVar} from 'graphql';
import {COLORS, SIZES} from 'constants/theme';
import {InputLogin} from 'components/form';

type LoginScreenProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;
type LoginData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const {
    handleSubmit,
    control,
    reset,
    formState: {errors},
  } = useForm<LoginData>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(loginSchema),
  });
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const {navigate} = useNavigation<LoginScreenProp>();

  const credentials = {
    email: 'test@gmail.com',
    password: '12345678',
  };
  const onSubmit = (data: LoginData) => {
    if (
      data.email === credentials.email &&
      data.password === credentials.password
    ) {
      userVar({
        email: data.email,
        password: data.password,
      });
      if (!toggleCheckBox) {
        reset();
        return navigate('Home');
      }

      return navigate('Home');
    }
  };

  return (
    <View>
      <InputLogin
        control={control}
        name="email"
        label="E-mail"
        keyboardType="email-address"
        placeholder="Enter your email"
        inputStyle={styles.input}
        errorMesssage={errors.email?.message}
        appendComponent={
          <View style={{justifyContent: 'center', marginRight: 10}}>
            <Image source={require('../../../assets/img/mail.png')} />
          </View>
        }
      />
      <InputLogin
        control={control}
        name="password"
        label="Password"
        placeholder="Enter your Password"
        errorMesssage={errors.password?.message}
        secureTextEntry={showPassword}
        inputStyle={styles.input}
        appendComponent={
          <View style={{justifyContent: 'center', marginRight: 10}}>
            <Image source={require('../../../assets/img/lock.png')} />
          </View>
        }
        appendSecondComponent={
          <View style={{justifyContent: 'center', marginRight: 10}}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setShowPassword(prev => !prev)}>
              <Icon name={showPassword ? 'eye-outline' : 'eye-off'} size={20} />
            </TouchableOpacity>
          </View>
        }
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Switch
            value={toggleCheckBox}
            onValueChange={newValue => setToggleCheckBox(newValue)}
          />
          <Text style={{color: COLORS.gray, fontSize: SIZES.h3, padding: 10}}>
            {' '}
            Remember Me
          </Text>
        </View>
        <Text style={{color: COLORS.purple, fontSize: SIZES.h3}}>
          Forgot Password?
        </Text>
      </View>
      <TouchableOpacity
        style={styles.appButtonContainer}
        activeOpacity={0.9}
        onPress={handleSubmit(onSubmit)}>
        <Text style={styles.appButtonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    color: 'white',
    margin: 20,
    marginLeft: 0,
  },
  button: {
    marginTop: 40,
    color: 'white',
    height: 40,
    backgroundColor: '#ec5990',
    borderRadius: 4,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 40,
    padding: 8,
    backgroundColor: '#0e101c',
  },
  input: {
    borderColor: 'none',
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 1050,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: '100%',
    height: 43,
    marginTop: 20,
  },
  appButtonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
