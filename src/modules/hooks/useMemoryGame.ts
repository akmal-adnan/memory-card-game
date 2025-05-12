import {
  GetPokemonParams,
  useGetPokemonList,
} from '@/modules/api/useGetPokemonList';
import { CardProps, Pokemon, PokemonGeneration } from '@/utils/Pokemon';
import { useEffect, useState } from 'react';

type Props = {
  pokemonGen: PokemonGeneration;
  totalCard: string;
  toggleDialog: () => void;
};

export function useMemoryGame({ pokemonGen, totalCard, toggleDialog }: Props) {
  const [isGameStart, setGameStart] = useState(false);
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [selectedCards, setSelectedCards] = useState<CardProps[]>([]);
  const [matchedCards, setMatchedCards] = useState<CardProps[]>([]);

  const currentOffset: GetPokemonParams = {
    limit: Number(pokemonGen.limit),
    offset: Number(pokemonGen.value),
  };

  const { fetchPokemonList, error, loading: isLoading } = useGetPokemonList();

  const cardLimit = Number(totalCard);

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
      setTimeout(() => {
        toggleDialog();
      }, 1000);
      console.log('All cards matched!');
    }
  }, [matchedCards, pokemonData, toggleDialog]);

  const handleStartGame = async () => {
    try {
      const { data: fetchedData } = await fetchPokemonList({
        variables: currentOffset,
      });
      const currentData = fetchedData?.pokemons?.results;

      if (!currentData) {
        throw new Error(`Could not fetch data from API: ${error}`);
      }

      const dataSlice = await Pokemon.getDataSlice(currentData, cardLimit);
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

  const handleResetGame = () => {
    setGameStart(false);
    setPokemonData([]);
    setSelectedCards([]);
    setMatchedCards([]);
  };

  return {
    isGameStart,
    isLoading,
    pokemonData,
    selectedCards,
    matchedCards,
    handleStartGame,
    turnCard,
    handleResetGame,
  };
}
