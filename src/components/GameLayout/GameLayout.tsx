import { MemoryCard } from '@/components/GameLayout/MemoryCard/MemoryCard';
import { SelectionCard } from '@/components/GameLayout/SelectionCard/SelectionCard';
import styles from '@/components/GameLayout/styles.module.scss';
import DATA from '@/data/data';
import { useMemoryGame } from '@/modules/hooks/useMemoryGame';
import { PokemonGeneration } from '@/utils/Pokemon';
import { useState } from 'react';
import { useDialog } from '../Dialog/useDialog';

export const GameLayout = () => {
  const [pokemonGen, setPokemonGen] = useState<PokemonGeneration>(
    DATA.pokemonGenerations[0]
  );
  const [totalCard, setTotalCard] = useState<string>('10');
  const { Dialog, dialogRef, toggleDialog } = useDialog();

  const {
    isGameStart,
    isLoading,
    pokemonData,
    selectedCards,
    matchedCards,
    handleStartGame,
    turnCard,
    handleResetGame,
  } = useMemoryGame({ pokemonGen, totalCard, toggleDialog });

  const handleRestart = () => {
    handleResetGame();
    toggleDialog();
  };

  return (
    <>
      <div className={styles.container} onClick={toggleDialog}>
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

        <Dialog toggleDialog={toggleDialog} ref={dialogRef} canClose={false}>
          <div className={styles.dialogContainer}>
            <h1>Hooray!</h1>
            <h2>You have compeleted the challenge 🎉</h2>
            <h1>Time: 10:39</h1>

            <button
              type="button"
              className={styles.buttonConfirm}
              disabled={isLoading}
              onClick={handleRestart}
            >
              Restart Now →
            </button>
          </div>
        </Dialog>
      </section>
    </>
  );
};
