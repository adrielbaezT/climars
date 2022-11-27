import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {useForm} from 'react-hook-form';
import Icon from 'react-native-vector-icons/Ionicons';
import {yupResolver} from '@hookform/resolvers/yup';
import {registerSchema} from './validations/resgisterSchema';
import {COLORS, SIZES} from 'constants/theme';
import {InputRegister} from 'components/form';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from 'navigation/StackNavigator';
import {useMutation} from '@apollo/client';
import {REGISTER_USER} from '../graphql/queries';
import {IRegisterUserVars, RegisterUserData} from '../interfaces';

type RegisterData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
type RegisterScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'Register'
>;

export const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(true);
  const navigate = useNavigation<RegisterScreenProp>();

  const [registerUser, {error: error_register, data: data_register}] =
    useMutation<RegisterUserData, IRegisterUserVars>(REGISTER_USER);

  const {
    handleSubmit,
    control,
    reset,
    formState: {errors},
  } = useForm<RegisterData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    resolver: yupResolver(registerSchema),
  });
  const onSubmit = async (data: RegisterData) => {
    const {firstName, lastName, email, password} = data;

    await registerUser({
      variables: {
        firstName,
        lastName,
        email,
        password,
        name: `${firstName} ${lastName}`,
      },
    });

    if (data_register && error_register === undefined) {
      reset();
      navigate.navigate('VerifyEmailScreen', {
        email: data.email,
        password: data.password,
      });
    }
  };

  return (
    <ScrollView automaticallyAdjustKeyboardInsets={true}>
      <InputRegister
        control={control}
        name="firstName"
        label="First Name"
        keyboardType="default"
        placeholder="Enter your first name"
        inputStyle={styles.input}
        errorMesssage={errors.firstName?.message}
      />
      <InputRegister
        control={control}
        name="lastName"
        label="Last Name"
        keyboardType="default"
        placeholder="Enter your last name"
        inputStyle={styles.input}
        errorMesssage={errors.lastName?.message}
      />
      <InputRegister
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
      <InputRegister
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
      <Text style={{fontSize: SIZES.h3, marginTop: 10}}>
        By signing up you agree to our{' '}
        <Text style={{fontWeight: 'bold', fontSize: SIZES.h3}}>
          Terms & Condition
        </Text>{' '}
        and{' '}
        <Text style={{fontWeight: 'bold', fontSize: SIZES.h3}}>
          Privacy Policy.*
        </Text>
      </Text>

      <View style={[styles.center, {marginTop: 60}]}>
        <TouchableOpacity
          style={styles.appButtonContainer}
          activeOpacity={0.9}
          onPress={handleSubmit(onSubmit)}>
          <Text style={styles.appButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
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
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: COLORS.gray,
    fontSize: SIZES.h1,
    fontWeight: '600',
  },
  input: {
    fontSize: 15,
  },
});
