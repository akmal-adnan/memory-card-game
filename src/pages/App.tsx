import { MemoryCard } from '@/components/MemoryCard/MemoryCard';
import styles from '@/pages/styles.module.scss';

function App() {
  return (
    <main>
      <div className={styles.container}>
        <h1>Memory Card Game</h1>
      </div>

      <section className={styles.itemContainer}>
        <MemoryCard />
      </section>
    </main>
  );
}

export default App;
