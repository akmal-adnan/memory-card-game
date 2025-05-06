import styles from '@/components/MemoryCard/styles.module.scss';
import DATA from '@/data/data';
import { CardProps, Pokemon } from '@/utils/Pokemon';

type Props = {
  data: Pokemon[];
  selectedCards: CardProps[];
  matchedCards: CardProps[];
  handleClick: (name: string, index: number) => void;
};

export const MemoryCard = ({
  data,
  matchedCards,
  selectedCards,
  handleClick,
}: Props) => {
  return (
    <div className={styles.container}>
      {data.map((item, index) => {
        const selectedCardEntry = selectedCards.find(
          (val) => val.index === index
        );
        const matchedCardEntry = matchedCards.find(
          (val) => val.index === index
        );
        const isDisabled = matchedCardEntry ? true : false;

        const isOnClickAvailable = selectedCardEntry
          ? () => {}
          : () => handleClick(item.name, index);

        const matchedStyle =
          selectedCardEntry || matchedCardEntry ? styles.flipped : '';

        return (
          <button
            key={index}
            className={styles.cardContainer}
            disabled={isDisabled}
            onClick={isOnClickAvailable}
          >
            <div className={`${styles.cardInner} ${matchedStyle}`}>
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
          </button>
        );
      })}
    </div>
  );
};
