import 'react-native-gesture-handler';
import React from 'react';
import {RootNavigator} from './src/navigation/RootNavigation';
import {ApolloClient, ApolloProvider} from '@apollo/client';
import {cache} from './graphql/cache';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'http://192.168.1.20:3000/api/graphql',
  cache,
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <RootNavigator />
    </ApolloProvider>
  );
};

export default App;
