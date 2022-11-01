import {InMemoryCache, makeVar} from '@apollo/client';

interface IUser {
  email: string;
  password: string;
}

export const changeColorTabBarVar = makeVar<boolean>(true);
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
        launches: {
          // ...field policy definitions...
        },
      },
    },
  },
});
