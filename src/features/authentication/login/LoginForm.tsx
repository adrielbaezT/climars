import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Switch,
  ActivityIndicator,
  Alert,
} from 'react-native';
// import {useQuery, gql} from '@apollo/client';
import {FormInput} from '../../../components';
import {COLORS, SIZES} from '../../../constants/theme';
import {RootStackParamList} from '../../../navigation/StackNavigator';

type LoginScreenProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [showSpinner, setShowSpinner] = useState(false);
  const {navigate} = useNavigation<LoginScreenProp>();
  if (showSpinner) {
    setInterval(() => {
      setShowSpinner(false);
    }, 3000);
  }

  const credentials = {
    email: 'test@gmail.com',
    password: '123456',
  };
  const handleSubmit = () => {
    setShowSpinner(true);
    //show info in alert
    if (!email || !password) {
      setShowSpinner(false);
      return Alert.alert('Error', 'Please enter your email and password');
    }
    if (password.length < 6) {
      setShowSpinner(false);
      return Alert.alert(
        'Error',
        'Password must be at least 6 characters long',
      );
    }
    if (email && password) {
      setShowSpinner(false);
      if (email === credentials.email && password === credentials.password) {
        if (!toggleCheckBox) {
          console.log('Remember me is not checked');

          setEmail('');
          setPassword('');
        }
        return navigate('Home');
      } else {
        return Alert.alert('Error', 'Invalid email or password');
      }
    }
  };

  // const IS_LOGGED_IN = gql`
  //   query IsUserLoggedIn {
  //     isLoggedIn @client
  //   }
  // `;
  // const {data} = useQuery(IS_LOGGED_IN);

  return (
    <>
      <FormInput
        inputStyle={styles.input}
        label="E-mail"
        placeholder="Your email"
        keyboardType="email-address"
        autocomplete="email"
        onChangeText={text => setEmail(text)}
        appendComponent={
          <View style={{justifyContent: 'center', marginRight: 10}}>
            <Image source={require('../../../assets/img/mail.png')} />
          </View>
        }
      />
      <FormInput
        inputStyle={styles.input}
        label="Password"
        placeholder="Your password"
        secureTextEntry={showPassword}
        autocomplete="off"
        onChangeText={text => setPassword(text)}
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
              <Image source={require('../../../assets/img/eye-off.png')} />
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
      <View style={[styles.center, {marginTop: 60}]}>
        {showSpinner ? (
          <ActivityIndicator size="large" color={COLORS.purple} />
        ) : (
          <TouchableOpacity
            style={styles.appButtonContainer}
            activeOpacity={0.9}
            onPress={handleSubmit}>
            <Text style={styles.appButtonText}>Login</Text>
          </TouchableOpacity>
        )}
      </View>
    </>
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
