import {Control} from 'react-hook-form/dist/types/form';
import {AutoCapitalizeTypes, KeyBoardTypes} from 'components/types/InputTypes';
import {LoginSchema} from '../types';

type LoginData = {
  email: string;
  password: string;
};

export interface ILogin {
  control: Control<LoginData, any>;
  containerStyle?: any;
  name: LoginSchema;
  label: string;
  placeholder: string;
  inputStyle?: any;
  secureTextEntry?: boolean;
  keyboardType?: KeyBoardTypes;
  autocomplete?: AutoCapitalizeTypes;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  errorMesssage?: string;
  appendComponent?: JSX.Element;
  appendSecondComponent?: JSX.Element;
  colorBackground?: string;
}
