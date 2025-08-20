import cardFlipSound from '@/assets/sounds/card_flip.mp3';
import styles from '@/components/GameLayout/MemoryCard/styles.module.scss';
import DATA from '@/data/data';
import { CardProps, Pokemon } from '@/utils/Pokemon';
import { useRef } from 'react';

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
  const flipAudioRef = useRef<HTMLAudioElement | null>(null);

  const playFlipSound = () => {
    if (flipAudioRef.current) {
      flipAudioRef.current.currentTime = 0;
      flipAudioRef.current.play().catch((err) => {
        console.warn('Audio play was blocked:', err);
      });
    }
  };

  return (
    <>
      <audio ref={flipAudioRef} src={cardFlipSound} preload="auto" />
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
            : () => {
                playFlipSound();
                handleClick(item.name, index);
              };

          const matchedStyle =
            selectedCardEntry || matchedCardEntry ? styles.flipped : '';

          const matchedCard = matchedCardEntry ? styles.cardMatched : '';

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

                <div className={`${styles.cardBack} ${matchedCard}`}>
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
    </>
  );
};
