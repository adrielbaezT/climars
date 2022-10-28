import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {FormInput} from '../../../components';
import {COLORS, SIZES} from '../../../constants/theme';

export const RegisterForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSpinner, setShowSpinner] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  if (showSpinner) {
    setInterval(() => {
      setShowSpinner(false);
    }, 3000);
  }
  const handleSubmit = () => {
    setShowSpinner(true);
    //show info in alert
    Alert.alert(
      `firstName: ${firstName} lastName: ${lastName} Email: ${email} Password: ${password}`,
    );
  };

  return (
    <>
      <FormInput
        inputStyle={styles.input}
        label="First Name"
        placeholder="Your First Name"
        onChangeText={text => setFirstName(text)}
      />
      <FormInput
        inputStyle={styles.input}
        label="Last Name"
        placeholder="Your Last Name"
        onChangeText={text => setLastName(text)}
      />
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
              <Icon name={showPassword ? 'eye' : 'eye-off'} size={20} />
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
        {showSpinner ? (
          <ActivityIndicator size="large" color={COLORS.purple} />
        ) : (
          <TouchableOpacity
            style={styles.appButtonContainer}
            activeOpacity={0.9}
            onPress={handleSubmit}>
            <Text style={styles.appButtonText}>Continue</Text>
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
