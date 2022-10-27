import 'react-native-gesture-handler';
import React from 'react';
import {RootNavigator} from './src/navigation/RootNavigation';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'http://192.168.1.20:3000/api/graphql',
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <RootNavigator />
    </ApolloProvider>
  );
};

export default App;
