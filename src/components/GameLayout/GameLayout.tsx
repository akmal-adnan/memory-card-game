import { MemoryCard } from '@/components/GameLayout/MemoryCard/MemoryCard';
import { SelectionCard } from '@/components/GameLayout/SelectionCard/SelectionCard';
import styles from '@/components/GameLayout/styles.module.scss';
import DATA from '@/data/data';
import { useMemoryGame } from '@/modules/hooks/useMemoryGame';
import { PokemonGeneration } from '@/utils/Pokemon';
import { useState } from 'react';

export const GameLayout = () => {
  const [pokemonGen, setPokemonGen] = useState<PokemonGeneration>(
    DATA.pokemonGenerations[0]
  );
  const [totalCard, setTotalCard] = useState<string>('10');

  const {
    isGameStart,
    isLoading,
    pokemonData,
    selectedCards,
    matchedCards,
    handleStartGame,
    turnCard,
  } = useMemoryGame({ pokemonGen, totalCard });

  console.log('Test commit');

  return (
    <>
      <div className={styles.container}>
        <h1>Memory Card Game</h1>
      </div>

      <section className={styles.itemContainer}>
        {!isGameStart && (
          <SelectionCard
            pokemonGen={pokemonGen}
            totalCard={totalCard}
            setPokemonGen={setPokemonGen}
            setTotalCard={setTotalCard}
            handleClick={handleStartGame}
            isLoading={isLoading}
          />
        )}

        {isGameStart && !isLoading && (
          <MemoryCard
            data={pokemonData}
            handleClick={turnCard}
            selectedCards={selectedCards}
            matchedCards={matchedCards}
          />
        )}
      </section>
    </>
  );
};
