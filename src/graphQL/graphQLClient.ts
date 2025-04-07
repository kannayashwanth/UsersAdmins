import {ApolloClient, HttpLink, InMemoryCache} from '@apollo/client';
import awsconfig from '../aws-exports';

const graphQLClient = new ApolloClient({
  uri: awsconfig.aws_appsync_graphqlEndpoint,
  cache: new InMemoryCache(),
  headers: {
    'x-api-key': awsconfig.aws_appsync_apiKey,
  },
});

export default graphQLClient;
