import {Control} from 'react-hook-form/dist/types/form';
import {AutoCapitalizeTypes, KeyBoardTypes} from 'components/types/InputTypes';
import {RegisterSchema} from '../types';

type RegisterData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export interface IRegister {
  control: Control<RegisterData, any>;
  containerStyle?: any;
  name: RegisterSchema;
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
