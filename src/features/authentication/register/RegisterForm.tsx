import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import {useForm} from 'react-hook-form';
import Icon from 'react-native-vector-icons/Ionicons';
import {yupResolver} from '@hookform/resolvers/yup';
import {registerSchema} from './validations/resgisterSchema';
import {InputForm} from 'components';
import {COLORS, SIZES} from 'constants/theme';

type RegisterData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(true);

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
  const onSubmit = (data: RegisterData) => {
    console.log(data);
    Alert.alert('Register', 'Register Success');
    reset();
  };

  return (
    <ScrollView automaticallyAdjustKeyboardInsets={true}>
      <InputForm
        control={control}
        name="firstName"
        label="First Name"
        keyboardType="default"
        placeholder="Enter your first name"
        inputStyle={styles.input}
        errorMesssage={errors.firstName?.message}
      />
      <InputForm
        control={control}
        name="lastName"
        label="Last Name"
        keyboardType="default"
        placeholder="Enter your last name"
        inputStyle={styles.input}
        errorMesssage={errors.lastName?.message}
      />
      <InputForm
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
      <InputForm
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
