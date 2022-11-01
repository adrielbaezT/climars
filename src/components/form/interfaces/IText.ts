import {Control} from 'react-hook-form/dist/types/form';
import {AutoCapitalizeTypes, KeyBoardTypes} from 'components/types/InputTypes';

type TextData = {
  search: string;
};

export interface IText {
  control: Control<TextData, any>;
  containerStyle?: any;
  name: 'search';
  label?: string;
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
