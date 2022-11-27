import {COLORS} from 'constants/theme';
import React, {FC} from 'react';
import {Controller} from 'react-hook-form';
import {StyleSheet, Text, TextInput, View} from 'react-native';

interface FormProps {
  control: any;
  name: string;
  placeholder: string;
  secureTextEntry?: boolean;
  errorMessage?: string;
  label?: string;
}

export const TextInputCustom: FC<FormProps> = ({
  control,
  name,
  placeholder,
  errorMessage,
  label,
}) => {
  return (
    <View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
        {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      </View>
      <Controller
        control={control}
        name={name}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            defaultValue={value}
            onBlur={onBlur}
            onChangeText={text => onChange(text)}
            value={value}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 300,
    height: 40,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 5,
    marginBottom: 15,
    padding: 10,
    fontSize: 16,
  },
  label: {
    fontSize: 17,
    color: COLORS.black,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  error: {
    color: COLORS.red,
    fontSize: 14,
    marginBottom: 5,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
