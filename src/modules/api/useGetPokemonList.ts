import { PokemonDataProps } from '@/utils/Pokemon';
import { ApolloError, gql, useLazyQuery } from '@apollo/client';

export type GetPokemonParams = {
  offset: number;
  limit: number;
};

export type GetPokemonResults = {
  loading: boolean;
  error?: ApolloError;
  data?: PokemonDataProps;
};

// Available Query
// count
// next
// previous
// status
// message
// results

const GET_POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      results {
        id
        name
        artwork
      }
    }
  }
`;

export const useGetPokemonList = () => {
  const [fetchPokemonList, { data, loading, error }] =
    useLazyQuery<PokemonDataProps>(GET_POKEMONS, {
      fetchPolicy: 'network-only',
    });

  return {
    fetchPokemonList,
    data,
    loading,
    error,
  };
};
