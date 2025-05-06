import styles from '@/components/Button/styles.module.scss';
import { memo } from 'react';

type Props = {
  handleClick: () => void;
  isLoading: boolean;
  //   children: ReactNode;
};

export const Button = memo(({ handleClick, isLoading = true }: Props) => {
  const currentText = isLoading ? 'Loading' : 'Start';
  return (
    <>
      <button
        className={styles.buttonContainer}
        onClick={handleClick}
        disabled={isLoading}
      >
        <h2>{currentText}</h2>
      </button>
    </>
  );
});
