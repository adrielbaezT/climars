import 'react-native-gesture-handler';
import React from 'react';
import {RootNavigator} from './navigation/RootNavigation';
import {ApolloClient, ApolloProvider} from '@apollo/client';
import {cache} from 'graphql';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'http://192.168.15.202:85/api/graphql',
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
