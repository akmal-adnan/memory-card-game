import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://graphql-pokeapi.graphcdn.app/', // URL for the GraphQL endpoint
  cache: new InMemoryCache(),
});

export default client;
