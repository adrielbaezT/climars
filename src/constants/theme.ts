import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const COLORS = {
  primary: '#EA7C46',
  secondary: '#3B3B3B',

  white: '#fff',
  white2: '#f3f3f3',
  lightGreen: '#4BEE70',
  red: '#D84035',
  orange: '#ea7c46',
  black: '#000000',
  purple: '#a42870',
  gray: '#5c5c5c',
  gray2: '#747980',
  lightGray: '#e3e4e5',
  lightGrayInput: '#a2a2a6',
  lightGray3: '#cdced1',
  transparentWhite: 'rgba(255, 255, 255, 0.2)',
  transparentBlack: 'rgba(0, 0, 0, 0.8)',
  transparentBlack1: 'rgba(0, 0, 0, 0.4)',
};
export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,
  // font sizes
  largeTitle: 40,
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  h5: 12,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 12,
  // app dimensions
  width,
  height,
};

const appTheme = {COLORS, SIZES};

export default appTheme;
