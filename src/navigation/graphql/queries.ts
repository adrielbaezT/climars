import {gql} from '@apollo/client';

export const CHANGE_COLOR_TAB_BAR = gql`
  query ChangeColorTabBar {
    changeColorTabBar @client
  }
`;
