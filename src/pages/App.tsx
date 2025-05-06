import { Button } from '@/components/Button/Button';
import { MemoryCard } from '@/components/MemoryCard/MemoryCard';
import { useMemoryGame } from '@/modules/hooks/useMemoryGame';
import styles from '@/pages/styles.module.scss';

function App() {
  const {
    isGameStart,
    isLoading,
    pokemonData,
    selectedCards,
    matchedCards,
    handleStartGame,
    turnCard,
  } = useMemoryGame();

  return (
    <main>
      <div className={styles.container}>
        <h1>Memory Card Game</h1>
      </div>

      <section className={styles.itemContainer}>
        {!isGameStart && (
          <Button handleClick={handleStartGame} isLoading={isLoading} />
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
    </main>
  );
}

export default App;
