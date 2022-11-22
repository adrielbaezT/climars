import React, {useState} from 'react';
import {COLORS} from 'constants/theme';
import {OTPEmail} from 'features/authentication';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from 'navigation/StackNavigator';
import {useNavigation} from '@react-navigation/native';
import {useLazyQuery} from '@apollo/client';
import {GET_VALIDATION} from 'features/authentication/graphql/queries';
import {
  GetValidationData,
  IGetValidationVars,
} from 'features/authentication/interfaces';

type VerifyEmailScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'VerifyEmailScreen'
>;

export const VerifyEmailScreen = () => {
  const navigate = useNavigation<VerifyEmailScreenProp>();
  const [otpCode, setOtpCode] = useState('');

  const [getValidation] = useLazyQuery<GetValidationData, IGetValidationVars>(
    GET_VALIDATION,
  );

  const handleVerify = async (code: string) => {
    const val_res = await getValidation({
      variables: {
        code,
      },
    });

    if (
      val_res.data?.getValidation.bool &&
      val_res.data?.getValidation.message === 'Validación exitosa'
    ) {
      navigate.navigate('Login');
    } else {
      Alert.alert('Error', 'Código de verificación incorrecto');
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
      }}>
      <StatusBar />
      <View style={{...styles.centerContent, width: '90%'}}>
        <View style={{...styles.centerContent}}>
          <Text style={styles.title}>Check your Mail</Text>
          <Text style={styles.text}>
            We,ve sent a 6-digit confirmation code to{' '}
            <Text style={{...styles.text, fontWeight: 'bold'}}>
              banstolakiran11@gmail.com.
            </Text>
            Make sure you enter correct code.
          </Text>
        </View>
        <OTPEmail onOTPChange={setOtpCode} />
        <TouchableOpacity
          style={{
            ...styles.appButtonContainer,
            backgroundColor:
              otpCode.length < 6 ? COLORS.transparentBlack1 : COLORS.primary,
          }}
          activeOpacity={0.9}
          disabled={otpCode.length < 6}
          onPress={() => handleVerify(otpCode.toLocaleLowerCase())}>
          <Text style={styles.appButtonText}>Verify</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: '#312e49',
    fontSize: 28,
    fontWeight: '600',
    marginTop: 60,
  },
  text: {
    color: '#312e49',
    fontSize: 16,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  appButtonContainer: {
    elevation: 8,
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
