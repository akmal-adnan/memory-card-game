import styles from '@/components/GameLayout/SelectionCard/styles.module.scss';
import DATA from '@/data/data';
import { PokemonGeneration } from '@/utils/Pokemon';

type Props = {
  totalCard: string;
  pokemonGen: PokemonGeneration;
  setTotalCard: (value: string) => void;
  setPokemonGen: (value: PokemonGeneration) => void;
  handleClick: () => void;
  isLoading: boolean;
};

export const SelectionCard = ({
  handleClick,
  setPokemonGen,
  setTotalCard,
  totalCard,
  isLoading,
}: Props) => {
  const handleGenerationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPokemonGen(JSON.parse(e.target.value));
  };

  const handleCardAmountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTotalCard(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleClick();
  };

  return (
    <div>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles.title}>
          Hello,
          <br />
          <span>Please choose your difficulty</span>
        </div>

        <div>
          <p className={styles.subText}>Select Pokémon Generation</p>
          <select
            name="generation"
            className={styles.input}
            onChange={handleGenerationChange}
          >
            {DATA.pokemonGenerations.map((gen) => {
              const stringValue = JSON.stringify(gen);

              return (
                <option key={gen.value} value={stringValue}>
                  {gen.label}
                </option>
              );
            })}
          </select>
        </div>

        <div>
          <p className={styles.subText}>Select Card Amount</p>
          <select
            name="cardAmount"
            className={styles.input}
            value={totalCard}
            onChange={handleCardAmountChange}
          >
            {DATA.cardAmounts.map((amount) => (
              <option key={amount.value} value={amount.value}>
                {amount.label}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className={styles.buttonConfirm}
          disabled={isLoading}
        >
          {isLoading ? 'loading..' : 'Start Now →'}
        </button>
      </form>
    </div>
  );
};
