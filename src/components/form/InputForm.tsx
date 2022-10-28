import React from 'react';
import {Text, View, TextInput, StyleSheet} from 'react-native';
import {Controller} from 'react-hook-form';
import {AutoCapitalizeTypes, KeyBoardTypes} from '../types/InputTypes';
import {COLORS, SIZES} from '../../constants/theme';
import {Control} from 'react-hook-form/dist/types/form';
import {LoginSchema, RegisterSchema} from './types';

type LoginData = {
  email: string;
  password: string;
};

type RegisterData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

interface FormInputProps {
  control: Control<LoginData | RegisterData, any>;
  containerStyle?: any;
  name: LoginSchema | RegisterSchema;
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

export const InputForm = ({
  name,
  label,
  placeholder,
  inputStyle,
  control,
  keyboardType = 'default',
  secureTextEntry = false,
  autoCapitalize = 'none',
  autocomplete = 'off',
  containerStyle,
  errorMesssage,
  appendComponent,
  appendSecondComponent,
  colorBackground = COLORS.white2,
}: FormInputProps) => {
  return (
    <View style={{...containerStyle}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.label}>{label}</Text>
        {errorMesssage && <Text style={styles.error}>{errorMesssage}</Text>}
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 55,
          paddingHorizontal: SIZES.padding,
          borderRadius: 10,
          backgroundColor: colorBackground,
          borderColor: !errorMesssage ? COLORS.lightGrayInput : COLORS.red,
          borderWidth: 1,
        }}>
        {appendComponent}
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={{flex: 1, ...inputStyle}}
              onBlur={onBlur}
              onChangeText={text => onChange(text)}
              value={value}
              placeholder={placeholder}
              placeholderTextColor={COLORS.gray}
              secureTextEntry={secureTextEntry}
              keyboardType={keyboardType}
              autoComplete={autocomplete}
              autoCapitalize={autoCapitalize}
            />
          )}
          name={name}
          rules={{required: true}}
        />
        {appendSecondComponent}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    color: COLORS.gray,
    fontSize: SIZES.h3,
    padding: 10,
    fontWeight: 'bold',
  },
  error: {
    color: COLORS.red,
    fontSize: SIZES.h3,
    padding: 10,
    fontWeight: 'bold',
  },
  containerError: {
    borderColor: COLORS.red,
  },
});
