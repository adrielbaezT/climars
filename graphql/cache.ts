import {InMemoryCache, makeVar} from '@apollo/client';

export const changeColorTabBarVar = makeVar<boolean>(true);

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        changeColorTabBar: {
          read() {
            return changeColorTabBarVar();
          },
        },
        launches: {
          // ...field policy definitions...
        },
      },
    },
  },
});
