import {InMemoryCache, makeVar} from '@apollo/client';
import {User} from 'features/authentication/login';

interface IUser extends User {}

export const changeColorTabBarVar = makeVar<boolean>(true);
export const onBoardingVar = makeVar<boolean>(true);
export const userVar = makeVar<IUser | null>(null);

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        changeColorTabBar: {
          read() {
            return changeColorTabBarVar();
          },
        },
        user: {
          read() {
            return userVar();
          },
        },
        onBoarding: {
          read() {
            return onBoardingVar();
          },
        },
        launches: {
          // ...field policy definitions...
        },
      },
    },
  },
});
