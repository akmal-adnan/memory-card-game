import {
  GetPokemonParams,
  useGetPokemonList,
} from '@/modules/api/useGetPokemonList';
import { CardProps, Pokemon } from '@/utils/Pokemon';
import { useEffect, useState } from 'react';

export function useMemoryGame() {
  const [isGameStart, setGameStart] = useState(false);
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [selectedCards, setSelectedCards] = useState<CardProps[]>([]);
  const [matchedCards, setMatchedCards] = useState<CardProps[]>([]);

  const currentOffset: GetPokemonParams = {
    offset: 0,
    limit: 100,
  };

  const { data, error, loading: isLoading } = useGetPokemonList(currentOffset);

  useEffect(() => {
    if (
      selectedCards.length === 2 &&
      selectedCards[0].name === selectedCards[1].name
    ) {
      setMatchedCards((prevMatchedCards) => [
        ...prevMatchedCards,
        ...selectedCards,
      ]);
    }
  }, [selectedCards]);

  useEffect(() => {
    if (pokemonData.length && matchedCards.length === pokemonData.length) {
      console.log('All cards matched!');
    }
  }, [matchedCards, pokemonData]);

  const handleStartGame = async () => {
    try {
      const currentData = data?.pokemons.results;

      if (!currentData) {
        throw new Error(`Could not fetch data from API: ${error}`);
      }

      const dataSlice = await Pokemon.getDataSlice(currentData);
      const pokemonArray = Pokemon.getPokemonArray(dataSlice);
      setPokemonData(pokemonArray);
      setGameStart(true);
    } catch (e) {
      console.error(e);
    }
  };

  const turnCard = (name: string, index: number) => {
    if (selectedCards.length < 2) {
      setSelectedCards((prevSelectedCards) => [
        ...prevSelectedCards,
        { name, index },
      ]);
    } else if (selectedCards.length === 2) {
      setSelectedCards([{ name, index }]);
    }
  };

  return {
    isGameStart,
    isLoading,
    pokemonData,
    selectedCards,
    matchedCards,
    handleStartGame,
    turnCard,
  };
}
