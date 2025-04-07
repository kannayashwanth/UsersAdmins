import React from 'react';

import Navigation from './appNavigator/Navigation';
import { ApolloProvider } from '@apollo/client';
import graphQLClient from './graphQL/graphQLClient';

const App = () => (
  <ApolloProvider client={graphQLClient}>
    <Navigation />
  </ApolloProvider>
)

export default App;
