import styles from '@/components/MemoryCard/styles.module.scss';
import DATA from '@/data/data';

const data = DATA.PokemonData.data.pokemons.results;

export const MemoryCard = () => {
  const pokemonData = data.slice(0, 12);

  return (
    <div className={styles.container}>
      {pokemonData.map((item, index) => {
        return (
          <div key={index} className={styles.cardContainer}>
            <div className={styles.cardInner}>
              <div className={styles.cardFront}>
                <img
                  className={styles.pokeballImage}
                  src={DATA.pokeballImage}
                  alt="Pokemon Images"
                />
              </div>

              <div className={styles.cardBack}>
                <img
                  className={styles.imageStyle}
                  src={item.artwork}
                  alt="Pokemon Images"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
