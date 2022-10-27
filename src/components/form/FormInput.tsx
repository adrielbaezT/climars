import React from 'react';
import {Text, TextInput, View} from 'react-native';
import {COLORS, SIZES} from '../../constants/theme';
import {AutoCapitalizeTypes, KeyBoardTypes} from '../types/InputTypes';

interface FormInputProps {
  containerStyle?: any;
  label?: string;
  placeholder: string;
  inputStyle?: any;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: KeyBoardTypes;
  autocomplete?: AutoCapitalizeTypes;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  errorMesssage?: string;
  appendComponent?: JSX.Element;
  appendSecondComponent?: JSX.Element;
  colorBackground?: string;
}

export const FormInput = ({
  containerStyle,
  label,
  placeholder,
  inputStyle,
  keyboardType = 'default',
  secureTextEntry = false,
  autoCapitalize = 'none',
  autocomplete = 'off',
  errorMesssage,
  onChangeText,
  appendComponent,
  appendSecondComponent,
  colorBackground = COLORS.white2,
}: FormInputProps) => {
  return (
    <View style={{...containerStyle}}>
      {label && (
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              color: COLORS.gray,
              fontSize: SIZES.h3,
              padding: 10,
              fontWeight: 'bold',
            }}>
            {label}
          </Text>
          <Text>{errorMesssage}</Text>
        </View>
      )}
      <View
        style={{
          flexDirection: 'row',
          height: 55,
          paddingHorizontal: SIZES.padding,
          borderRadius: 10,
          backgroundColor: colorBackground,
          borderColor: COLORS.lightGrayInput,
          borderWidth: 1,
        }}>
        {appendComponent}

        <TextInput
          style={{flex: 1, ...inputStyle}}
          placeholder={placeholder}
          placeholderTextColor={COLORS.gray}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoComplete={autocomplete}
          autoCapitalize={autoCapitalize}
          onChangeText={text => onChangeText(text)}
        />
        {appendSecondComponent}
      </View>
    </View>
  );
};
