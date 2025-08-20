import matchedCardSound from '@/assets/sounds/notification.mp3';
import { MemoryCard } from '@/components/GameLayout/MemoryCard/MemoryCard';
import { SelectionCard } from '@/components/GameLayout/SelectionCard/SelectionCard';
import styles from '@/components/GameLayout/styles.module.scss';
import DATA from '@/data/data';
import { useMemoryGame } from '@/modules/hooks/useMemoryGame';
import { PokemonGeneration } from '@/utils/Pokemon';
import { useEffect, useRef, useState } from 'react';
import { useDialog } from '../Dialog/useDialog';

export const GameLayout = () => {
  const matchedAudioRef = useRef<HTMLAudioElement | null>(null);
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
    displayTime,
  } = useMemoryGame({ pokemonGen, totalCard, toggleDialog });

  const handleRestart = () => {
    handleResetGame();
    toggleDialog();
  };

  const prevMatchedCount = useRef(matchedCards.length);

  useEffect(() => {
    if (matchedCards.length > prevMatchedCount.current) {
      setTimeout(() => {
        if (matchedAudioRef.current) {
          matchedAudioRef.current.currentTime = 0;
          matchedAudioRef.current.play().catch((err) => {
            console.warn('Audio play was blocked:', err);
          });
        }
      }, 500);
    }
    prevMatchedCount.current = matchedCards.length;
  }, [matchedCards]);

  return (
    <>
      <audio ref={matchedAudioRef} src={matchedCardSound} preload="auto" />

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

        {isGameStart && (
          <div className={styles.timerContainer}>
            <h1>{displayTime}</h1>
          </div>
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
            <h1>Time: {displayTime}</h1>

            <button
              type="button"
              className={styles.buttonConfirm}
              disabled={isLoading}
              onClick={handleRestart}
            >
              New Game →
            </button>
          </div>
        </Dialog>
      </section>
    </>
  );
};
