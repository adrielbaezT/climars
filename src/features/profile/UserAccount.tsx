import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Alert, StyleSheet, View} from 'react-native';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {BackButton, Button} from 'components/buttton';
import {Title} from 'components/text';
import {COLORS} from 'constants/theme';
import {EditUserResponse, EditUserVars} from './interfaces';
import {TextInputCustom} from './components/TextInputCustom';
import {userVar} from 'graphql';
import {useMutation} from '@apollo/client';
import {EDIT_USER} from './graphql/queries';

const EditUserSchema = yup.object().shape({
  name: yup.string().required('You must enter a name'),
  firstName: yup.string().required('You must enter a first name'),
  lastName: yup.string().required('You must enter a last name'),
  email: yup.string().required('You must enter a email'),
});

interface IEditUser {
  name: string;
  firstName: string;
  lastName: string;
  email: string;
}
export const UserAccount = () => {
  const {goBack} = useNavigation();
  const user = userVar();

  const [editUser, {}] = useMutation(EDIT_USER, {
    context: {
      headers: {
        authorization: `Bearer ${user?.token}`,
      },
    },
  });

  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm<IEditUser>({
    defaultValues: {
      name: user?.name || '',
      firstName: user?.first_name || '',
      lastName: user?.last_name || '',
      email: user?.email || '',
    },
    resolver: yupResolver(EditUserSchema),
  });

  const onSubmit = async (data: IEditUser) => {
    const {data: userEditResp} = await editUser({
      variables: {
        id: user?.id,
        name: data.name,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
      },
    });

    if (userEditResp) {
      userVar({
        ...userVar(),
        name: data.name,
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
      });
      goBack();
    } else {
      Alert.alert('Error', 'Error editing user');
      goBack();
    }
  };

  return (
    <View style={styles.container}>
      <BackButton goBack={goBack} />
      <View style={styles.editUser}>
        <Title title="Edit User" />
        <View style={styles.form}>
          <TextInputCustom
            control={control}
            name="name"
            placeholder="Name"
            label="Name"
            errorMessage={errors.name?.message}
          />
          <TextInputCustom
            control={control}
            name="firstName"
            placeholder="First Name"
            label="First Name"
            errorMessage={errors.firstName?.message}
          />
          <TextInputCustom
            control={control}
            name="lastName"
            placeholder="Last Name"
            label="Last Name"
            errorMessage={errors.lastName?.message}
          />
          <TextInputCustom
            control={control}
            name="email"
            placeholder="Email"
            label="E-mail"
            errorMessage={errors.email?.message}
          />

          <Button
            title="Save"
            width={300}
            handleOnPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  editUser: {
    flex: 1,
    alignItems: 'center',
    marginTop: 80,
  },
  form: {
    flex: 1,
    alignItems: 'center',
  },
  input: {
    width: 300,
    height: 40,
    borderBottomColor: COLORS.black,
    borderBottomWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
  },
});
