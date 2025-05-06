import { PokemonDataProps } from '@/utils/Pokemon';
import { ApolloError, gql, useQuery } from '@apollo/client';

export type GetPokemonParams = {
  offset: number;
  limit: number;
};

export type GetPokemonResults = {
  loading: boolean;
  error?: ApolloError;
  data?: PokemonDataProps;
};

const GET_POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      status
      message
      results {
        id
        name
        artwork
      }
    }
  }
`;

export const useGetPokemonList = ({
  offset = 0,
  limit = 10,
}: GetPokemonParams) => {
  const { loading, error, data }: GetPokemonResults =
    useQuery<PokemonDataProps>(GET_POKEMONS, {
      variables: { offset, limit },
    });

  return { loading, error, data };
};
