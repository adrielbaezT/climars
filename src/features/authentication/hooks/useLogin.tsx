import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import axios from 'axios';
import {onBoardingVar, userVar} from 'graphql';
import {RootStackParamList} from 'navigation/StackNavigator';
import {Alert} from 'react-native';
import {User} from '../login/interfaces/User';

type LoginData = {
  email: string;
  password: string;
};
type LoginScreenProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

interface ILoginUserProps {
  toggleCheckBox?: boolean;
  reset?: () => void;
}

export const useLogin = ({
  reset = undefined,
  toggleCheckBox = false,
}: ILoginUserProps) => {
  const {navigate} = useNavigation<LoginScreenProp>();
  const loginUser = async (dataLogin: LoginData) => {
    const {data} = await axios.post<User>(
      'http://192.168.15.202:85/api/auth/login',
      dataLogin,
    );
    if (!data) {
      return Alert.alert('Error', 'Email or password incorrect');
    }

    userVar({...data});
    if (!onBoardingVar()) {
      return navigate('Home');
    }
    if (!toggleCheckBox) {
      reset && reset();
      return navigate('OnBoardingScreen');
    }

    return navigate('OnBoardingScreen');
  };

  return {loginUser};
};
