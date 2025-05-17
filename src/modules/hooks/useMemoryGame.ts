import {
  GetPokemonParams,
  useGetPokemonList,
} from '@/modules/api/useGetPokemonList';
import { CardProps, Pokemon, PokemonGeneration } from '@/utils/Pokemon';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

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

  const currentOffset = useMemo<GetPokemonParams>(
    () => ({
      limit: Number(pokemonGen.limit),
      offset: Number(pokemonGen.value),
    }),
    [pokemonGen.limit, pokemonGen.value]
  );

  const { fetchPokemonList, error, loading: isLoading } = useGetPokemonList();

  const cardLimit = Number(totalCard);

  // Timer state and ref
  const [displayTime, setDisplayTime] = useState('00:00');
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const timeElapsed = useRef(0);

  // Format seconds to mm:ss
  const formatTime = (seconds: number) => {
    const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
    const ss = String(seconds % 60).padStart(2, '0');
    return `${mm}:${ss}`;
  };

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

  // Start/stop timer based on game state
  useEffect(() => {
    if (isGameStart) {
      setDisplayTime('00:00');
      timeElapsed.current = 0;
      timerRef.current = setInterval(() => {
        timeElapsed.current += 1;
        setDisplayTime(formatTime(timeElapsed.current));
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setDisplayTime('00:00');
      timeElapsed.current = 0;
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isGameStart]);

  useEffect(() => {
    if (pokemonData.length && matchedCards.length === pokemonData.length) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setTimeout(() => {
        toggleDialog();
      }, 1000);
      console.log('All cards matched!');
    }
  }, [matchedCards, pokemonData, toggleDialog]);

  const handleStartGame = useCallback(async () => {
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
  }, [cardLimit, currentOffset, error, fetchPokemonList]);

  const turnCard = useCallback(
    (name: string, index: number) => {
      if (selectedCards.length < 2) {
        setSelectedCards((prevSelectedCards) => [
          ...prevSelectedCards,
          { name, index },
        ]);
      } else if (selectedCards.length === 2) {
        setSelectedCards([{ name, index }]);
      }
    },
    [selectedCards.length]
  );

  const handleResetGame = useCallback(() => {
    setGameStart(false);
    setPokemonData([]);
    setSelectedCards([]);
    setMatchedCards([]);
  }, []);

  return {
    isGameStart,
    isLoading,
    pokemonData,
    selectedCards,
    matchedCards,
    handleStartGame,
    turnCard,
    handleResetGame,
    displayTime,
  };
}
