import * as yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(yup);

export const loginSchema = yup.object({
  email: yup.string().email().required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 8 characters long')
    .max(20, 'Password must be at most 20 characters long'),
});
